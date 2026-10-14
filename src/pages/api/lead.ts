import type { APIRoute } from 'astro';
import {
  HUBSPOT_PORTAL_ID,
  HUBSPOT_FORM_GUID,
  LEAD_WEBHOOK_URL,
  LEAD_WEBHOOK_SECRET,
  LEAD_NOTIFY_WEBHOOK_URL,
  TURNSTILE_SECRET_KEY,
  REQUIRE_WORK_EMAIL,
} from 'astro:env/server';
import { parseLead, validateLead, looksLikeSpam, rateLimited, verifyTurnstile, submitToHubSpot, postWebhook, notify } from '../../lib/lead.ts';
import { routes } from '../../lib/routes.ts';

/** The only on-demand route in the project. Everything else is prerendered. */
export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export const POST: APIRoute = async ({ request, clientAddress, redirect }) => {
  const contentType = request.headers.get('content-type') ?? '';
  const wantsJson = contentType.includes('application/json') || (request.headers.get('accept') ?? '').includes('application/json');
  const ip = safeAddress(() => clientAddress) ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

  const fail = (status: number, errors: Record<string, string>) =>
    wantsJson ? json({ ok: false, errors }, status) : redirect(`${routes.contact}?error=${encodeURIComponent(Object.values(errors)[0] ?? 'form')}#lead-form`, 303);

  if (ip && rateLimited(ip)) return fail(429, { form: 'rate' });

  let input;
  try {
    input = contentType.includes('application/json') ? parseLead((await request.json()) as Record<string, unknown>) : parseLead(await request.formData());
  } catch {
    return fail(400, { form: 'form' });
  }

  if (looksLikeSpam(input)) return fail(400, { form: 'spam' });

  if (TURNSTILE_SECRET_KEY) {
    const ok = await verifyTurnstile(input.turnstileToken, TURNSTILE_SECRET_KEY, ip);
    if (!ok) return fail(400, { form: 'spam' });
  }

  const errors = validateLead(input, { requireWorkEmail: REQUIRE_WORK_EMAIL });
  if (Object.keys(errors).length) return fail(422, errors as Record<string, string>);

  const deliveries: Promise<void>[] = [];
  if (HUBSPOT_PORTAL_ID && HUBSPOT_FORM_GUID) {
    deliveries.push(submitToHubSpot(input, { portalId: HUBSPOT_PORTAL_ID, formGuid: HUBSPOT_FORM_GUID }, { ip, pageName: 'Request an NDA call' }));
  }
  if (LEAD_WEBHOOK_URL) deliveries.push(postWebhook(LEAD_WEBHOOK_URL, LEAD_WEBHOOK_SECRET, input, { ip }));

  if (deliveries.length === 0) {
    // No CRM configured (local development): log and succeed so the flow can be tested end to end.
    console.info('[lead] no CRM configured; submission:', { ...input, turnstileToken: undefined });
  } else {
    const results = await Promise.allSettled(deliveries);
    const failed = results.filter((r): r is PromiseRejectedResult => r.status === 'rejected');
    if (failed.length === results.length) {
      console.error('[lead] all deliveries failed', failed.map((f) => String(f.reason)));
      return fail(502, { form: 'form' });
    }
    for (const f of failed) console.error('[lead] delivery failed', String(f.reason));
  }

  if (LEAD_NOTIFY_WEBHOOK_URL) void notify(LEAD_NOTIFY_WEBHOOK_URL, input);

  return wantsJson ? json({ ok: true }) : redirect(routes.thankYou, 303);
};

export const GET: APIRoute = () => json({ ok: false, errors: { form: 'method' } }, 405);

function safeAddress(fn: () => string): string | undefined {
  try {
    return fn();
  } catch {
    return undefined;
  }
}
