/**
 * Progressive enhancement for the NDA call form: client validation, JSON
 * submission, inline success state and conversion tracking. Without JS the
 * form posts normally and the server redirects to /thank-you/.
 */
import { PUBLIC_TURNSTILE_SITE_KEY } from 'astro:env/client';

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
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: Record<string, string> };
      if (res.ok && body.ok) {
        window.siTrack?.('lead_submit', { project_type: data.projectType, timeline: data.timeline });
        form.hidden = true;
        const success = document.getElementById('lead-form-success');
        if (success) {
          success.hidden = false;
          success.focus();
        }
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
