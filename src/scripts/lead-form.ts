/**
 * Progressive enhancement for the NDA call form: client validation, JSON
 * submission, inline success state and conversion tracking. Without JS the
 * form posts normally and the server redirects to /thank-you/.
 */
import { PUBLIC_TURNSTILE_SITE_KEY, PUBLIC_HUBSPOT_PORTAL_ID, PUBLIC_HUBSPOT_FORM_GUID } from 'astro:env/client';

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset: (id?: string) => void };
  }
}

const form = document.getElementById('lead-form') as HTMLFormElement | null;

if (form) {
  const i18n = JSON.parse(document.getElementById('lead-form-i18n')?.textContent ?? '{}') as Record<string, string>;
  const status = document.getElementById('lead-form-status') as HTMLElement;
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const submitLabel = submitBtn?.textContent ?? '';

  // Time trap for bots that submit instantly.
  const ts = form.querySelector<HTMLInputElement>('input[name="_t"]');
  if (ts) ts.value = String(Date.now());
  const pageUri = form.querySelector<HTMLInputElement>('input[name="pageUri"]');
  if (pageUri) pageUri.value = location.href;
  const hutk = form.querySelector<HTMLInputElement>('input[name="hutk"]');
  if (hutk) hutk.value = document.cookie.match(/(?:^|; )hubspotutk=([^;]+)/)?.[1] ?? '';

  // Load Turnstile only when the visitor reaches the form.
  let turnstileLoaded = false;
  const turnstileHost = form.querySelector<HTMLElement>('.turnstile');
  const loadTurnstile = () => {
    if (turnstileLoaded || !PUBLIC_TURNSTILE_SITE_KEY || !turnstileHost) return;
    turnstileLoaded = true;
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=siTurnstileReady';
    s.async = true;
    (window as unknown as Record<string, unknown>).siTurnstileReady = () => {
      window.turnstile?.render(turnstileHost, { sitekey: PUBLIC_TURNSTILE_SITE_KEY, theme: document.documentElement.dataset.theme === 'light' ? 'light' : 'dark' });
    };
    document.head.appendChild(s);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        loadTurnstile();
        io.disconnect();
      }
    });
    io.observe(form);
  } else {
    loadTurnstile();
  }

  const fieldError = (name: string, message: string | null) => {
    const field = form.querySelector<HTMLElement>(`[name="${name}"]`);
    const errorEl = document.getElementById(`${name}-error`);
    if (!field || !errorEl) return;
    errorEl.textContent = message ?? '';
    errorEl.hidden = !message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  const clearErrors = () => {
    form.querySelectorAll<HTMLElement>('.field__error').forEach((el) => {
      el.textContent = '';
      el.hidden = true;
    });
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.setAttribute('aria-invalid', 'false'));
    status.hidden = true;
    status.textContent = '';
  };

  const showErrors = (errors: Record<string, string>) => {
    let first: HTMLElement | null = null;
    for (const [name, code] of Object.entries(errors)) {
      const message = i18n[code] ?? i18n.form ?? '';
      if (name === 'form') {
        status.hidden = false;
        status.className = 'lead-form__status lead-form__status--error';
        status.textContent = message;
      } else {
        fieldError(name, message);
        first ??= form.querySelector<HTMLElement>(`[name="${name}"]`);
      }
    }
    (first ?? status).focus?.();
  };

  const validate = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    const v = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)?.value.trim() ?? '';
    if (v('name').length < 2) errors.name = 'name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) errors.email = 'email';
    if (v('company').length < 2) errors.company = 'company';
    if (!v('projectType')) errors.projectType = 'projectType';
    if (!v('timeline')) errors.timeline = 'timeline';
    if (v('message').length < 10) errors.message = 'message';
    if (!(form.elements.namedItem('consent') as HTMLInputElement | null)?.checked) errors.consent = 'consent';
    return errors;
  };

  /**
   * Static hosting fallback: when the site is served without the /api/lead route
   * (GitHub Pages, plain object storage), submit straight to HubSpot's public
   * Forms API. Returns null when not configured.
   */
  const submitToHubSpotDirect = async (data: Record<string, string>): Promise<boolean | null> => {
    if (!PUBLIC_HUBSPOT_PORTAL_ID || !PUBLIC_HUBSPOT_FORM_GUID) return null;
    const name = (data.name ?? '').trim();
    const parts = name.split(/\s+/);
    const first = parts.length > 1 ? parts.slice(0, -1).join(' ') : name;
    const last = parts.length > 1 ? (parts[parts.length - 1] ?? '') : '';
    const field = (name: string, value: string) => ({ objectTypeId: '0-1', name, value });
    const payload = {
      submittedAt: Date.now(),
      fields: [
        field('firstname', first),
        field('lastname', last),
        field('email', (data.email ?? '').trim().toLowerCase()),
        field('company', (data.company ?? '').trim()),
        field('project_type', data.projectType ?? ''),
        field('target_node', data.targetNode ?? ''),
        field('project_timeline', data.timeline ?? ''),
        field('message', (data.message ?? '').trim()),
      ],
      context: { pageUri: location.href, pageName: document.title, ...(data.hutk ? { hutk: data.hutk } : {}) },
      legalConsentOptions: { consent: { consentToProcess: true, text: i18n.consentText ?? 'Consent to process this request.', communications: [] } },
    };
    try {
      const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${encodeURIComponent(PUBLIC_HUBSPOT_PORTAL_ID)}/${encodeURIComponent(PUBLIC_HUBSPOT_FORM_GUID)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const showSuccess = (data: Record<string, string>) => {
    window.siTrack?.('lead_submit', { project_type: data.projectType, timeline: data.timeline });
    form.hidden = true;
    const success = document.getElementById('lead-form-success');
    if (success) {
      success.hidden = false;
      success.focus();
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();
    const errors = validate();
    if (Object.keys(errors).length) {
      showErrors(errors);
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    data.consent = 'true';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = i18n.submitting ?? submitLabel;
    }

    try {
      // Honeypot filled: behave as if sent, deliver nothing.
      if (data.website) {
        showSuccess(data);
        return;
      }
      let res: Response | null = null;
      try {
        res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
      } catch {
        res = null;
      }
      if (res === null || res.status === 404 || res.status === 405) {
        const direct = await submitToHubSpotDirect(data);
        if (direct === true) showSuccess(data);
        else showErrors({ form: 'form' });
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: Record<string, string> };
      if (res.ok && body.ok) {
        showSuccess(data);
      } else {
        showErrors(body.errors ?? { form: 'form' });
        window.turnstile?.reset();
      }
    } catch {
      showErrors({ form: 'form' });
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      }
    }
  });

  // Surface a server-side error after a no-JS redirect (?error=code).
  const code = new URLSearchParams(location.search).get('error');
  if (code) showErrors({ form: code });
}

export {};
