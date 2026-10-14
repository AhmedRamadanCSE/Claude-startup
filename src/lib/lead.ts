/**
 * Server-side lead handling: validation, spam checks, CRM delivery.
 * Used only by src/pages/api/lead.ts (never bundled for the client).
 */

export interface LeadInput {
  name: string;
  email: string;
  company: string;
  projectType: string;
  targetNode: string;
  timeline: string;
  message: string;
  consent: boolean;
  /** Honeypot: must stay empty. */
  website: string;
  /** Client timestamp (ms) set by JS; absent for no-JS submissions. */
  _t: string;
  turnstileToken: string;
  pageUri: string;
  hutk: string;
}

export type LeadErrors = Partial<Record<keyof LeadInput | 'form', string>>;

const PROJECT_TYPES = new Set([
  'serdes', 'ddr-phy', 'pll-adpll', 'bluetooth-ble', 'ucie', 'data-converter', 'power-management', 'ip-porting', 'bring-up', 'dedicated-team', 'other',
]);
const TIMELINES = new Set(['asap', '1-3-months', '3-6-months', 'exploring']);

export const FREE_MAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.co.jp', 'ymail.com', 'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'live.com', 'msn.com',
  'aol.com', 'icloud.com', 'me.com', 'mac.com', 'protonmail.com', 'proton.me', 'pm.me', 'gmx.com', 'gmx.de', 'gmx.net', 'web.de', 'mail.com', 'zoho.com',
  'yandex.com', 'yandex.ru', 'mail.ru', 'qq.com', '163.com', '126.com', 'sina.com', 'naver.com', 'daum.net', 'hanmail.net', 'nate.com', 'rediffmail.com',
  'fastmail.com', 'hey.com', 'tutanota.com', 'tuta.io',
]);

const str = (v: FormDataEntryValue | unknown): string => (typeof v === 'string' ? v : '').trim();

export function parseLead(source: FormData | Record<string, unknown>): LeadInput {
  const get = (k: string) => (source instanceof FormData ? str(source.get(k)) : str(source[k]));
  const consentRaw = source instanceof FormData ? source.get('consent') : source['consent'];
  return {
    name: get('name').slice(0, 200),
    email: get('email').toLowerCase().slice(0, 254),
    company: get('company').slice(0, 200),
    projectType: get('projectType').slice(0, 50),
    targetNode: get('targetNode').slice(0, 100),
    timeline: get('timeline').slice(0, 50),
    message: get('message').slice(0, 5000),
    consent: consentRaw === true || consentRaw === 'true' || consentRaw === 'on' || consentRaw === '1',
    website: get('website'),
    _t: get('_t'),
    turnstileToken: get('cf-turnstile-response') || get('turnstileToken'),
    pageUri: get('pageUri').slice(0, 500),
    hutk: get('hutk').slice(0, 100),
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLead(input: LeadInput, opts: { requireWorkEmail: boolean }): LeadErrors {
  const errors: LeadErrors = {};
  if (input.name.length < 2) errors.name = 'name';
  if (!EMAIL_RE.test(input.email)) errors.email = 'email';
  else if (opts.requireWorkEmail) {
    const domain = input.email.split('@')[1] ?? '';
    if (FREE_MAIL_DOMAINS.has(domain)) errors.email = 'workEmail';
  }
  if (input.company.length < 2) errors.company = 'company';
  if (!PROJECT_TYPES.has(input.projectType)) errors.projectType = 'projectType';
  if (!TIMELINES.has(input.timeline)) errors.timeline = 'timeline';
  if (input.message.length < 10) errors.message = 'message';
  if (!input.consent) errors.consent = 'consent';
  return errors;
}

/** Cheap bot heuristics that need no third party. */
export function looksLikeSpam(input: LeadInput): boolean {
  if (input.website) return true; // honeypot filled
  if (input._t) {
    const age = Date.now() - Number(input._t);
    if (!Number.isFinite(age) || age < 3000 || age > 1000 * 60 * 60 * 6) return true; // < 3 s or > 6 h
  }
  const links = (input.message.match(/https?:\/\//g) ?? []).length;
  if (links > 3) return true;
  if (/\b(viagra|casino|crypto\s*signals|seo\s*services)\b/i.test(input.message)) return true;
  return false;
}

// ---- Rate limiting (per process; adequate for a standalone Node server) ----
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, max = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}

// ---- Cloudflare Turnstile ---------------------------------------------------
export async function verifyTurnstile(token: string, secret: string, ip: string | undefined): Promise<boolean> {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

// ---- CRM delivery -----------------------------------------------------------
function splitName(full: string): { first: string; last: string } {
  const parts = full.split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { first: full, last: '' };
  return { first: parts.slice(0, -1).join(' '), last: parts[parts.length - 1] ?? '' };
}

/**
 * HubSpot Forms API v3 (no API key required for the public submit endpoint).
 * Custom contact properties expected in the portal: project_type, target_node, project_timeline.
 */
export async function submitToHubSpot(
  input: LeadInput,
  cfg: { portalId: string; formGuid: string },
  ctx: { ip?: string; pageName: string },
): Promise<void> {
  const { first, last } = splitName(input.name);
  const payload = {
    submittedAt: Date.now(),
    fields: [
      { objectTypeId: '0-1', name: 'firstname', value: first },
      { objectTypeId: '0-1', name: 'lastname', value: last },
      { objectTypeId: '0-1', name: 'email', value: input.email },
      { objectTypeId: '0-1', name: 'company', value: input.company },
      { objectTypeId: '0-1', name: 'project_type', value: input.projectType },
      { objectTypeId: '0-1', name: 'target_node', value: input.targetNode },
      { objectTypeId: '0-1', name: 'project_timeline', value: input.timeline },
      { objectTypeId: '0-1', name: 'message', value: input.message },
    ],
    context: {
      ...(input.hutk ? { hutk: input.hutk } : {}),
      ...(ctx.ip ? { ipAddress: ctx.ip } : {}),
      pageUri: input.pageUri || undefined,
      pageName: ctx.pageName,
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: 'I agree that my details are processed to respond to this request, as described in the privacy policy.',
        communications: [],
      },
    },
  };
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${encodeURIComponent(cfg.portalId)}/${encodeURIComponent(cfg.formGuid)}`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HubSpot responded ${res.status}: ${text.slice(0, 300)}`);
  }
}

/** Generic JSON webhook for any CRM (Zapier, Make, Pipedrive, a custom endpoint). */
export async function postWebhook(url: string, secret: string | undefined, input: LeadInput, ctx: { ip?: string }): Promise<void> {
  const { website: _hp, turnstileToken: _tt, _t: _ts, ...clean } = input;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(secret ? { 'X-Webhook-Secret': secret } : {}) },
    body: JSON.stringify({ source: 'website-nda-call-form', receivedAt: new Date().toISOString(), ip: ctx.ip, lead: clean }),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/** Internal notification (Slack/Teams incoming webhook: { text }). Failures are ignored. */
export async function notify(url: string, input: LeadInput): Promise<void> {
  const text = [
    `New NDA call request: ${input.name} (${input.email}) at ${input.company}`,
    `Project: ${input.projectType} · Node: ${input.targetNode || 'n/a'} · Timeline: ${input.timeline}`,
    input.message,
  ].join('\n');
  try {
    await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
  } catch {
    /* best effort */
  }
}
