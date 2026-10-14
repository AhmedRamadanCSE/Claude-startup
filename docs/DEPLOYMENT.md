# Deployment and configuration

## Stack

- **Astro 7** (static output) with the **Node adapter** in standalone mode. Every page is prerendered to HTML; the only on-demand route is `POST /api/lead`.
- No client-side framework. Three small scripts: consent/analytics, the lead form, the mobile menu/theme toggle.
- Self-hosted fonts, build-time OG images (satori + resvg), sitemap, robots.txt.

## Local development

```bash
npm install
cp .env.example .env     # fill what you have; everything is optional for dev
npm run dev              # http://localhost:4321
npm run check            # TypeScript + Astro diagnostics
npm run build && npm start   # production server on :4321
npm run docs             # regenerate docs/COPY.md and docs/PLACEHOLDERS.md
npm run lighthouse -- http://localhost:4321   # mobile Lighthouse on key pages
```

Without CRM variables, form submissions are logged to the server console and succeed, so the full flow can be tested.

## Environment variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | build | Canonical origin for links, sitemap, OG. Defaults to `https://silicon-partner.com`. |
| `PUBLIC_GA4_MEASUREMENT_ID` | client | Google Analytics 4 (`G-…`). Empty disables. |
| `PUBLIC_GOOGLE_ADS_CONVERSION_ID` | client | Google Ads (`AW-…`). Empty disables. |
| `PUBLIC_GOOGLE_ADS_LEAD_LABEL` / `_BOOKING_LABEL` | client | Conversion labels for form submit and calendar booking. |
| `PUBLIC_LINKEDIN_PARTNER_ID` | client | LinkedIn Insight Tag. Empty disables. |
| `PUBLIC_LINKEDIN_LEAD_CONVERSION_ID` / `_BOOKING_CONVERSION_ID` | client | LinkedIn conversion IDs. |
| `PUBLIC_CALENDAR_URL` | client | Cal.com or Calendly public link, loaded on click. |
| `PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | client / server | Cloudflare Turnstile. Both set = enforced. |
| `HUBSPOT_PORTAL_ID` / `HUBSPOT_FORM_GUID` | server | HubSpot Forms API v3 target. |
| `LEAD_WEBHOOK_URL` / `LEAD_WEBHOOK_SECRET` | server | Generic JSON webhook (sent `X-Webhook-Secret`). Can run alongside HubSpot. |
| `LEAD_NOTIFY_WEBHOOK_URL` | server | Slack/Teams incoming webhook for an internal ping per lead. |
| `REQUIRE_WORK_EMAIL` | server | Reject free-mail domains (default `true`). |
| `PUBLIC_SHOW_PLACEHOLDERS` | build | Highlight `[PLACEHOLDER]` text (default `true`; set `false` at launch). |

All variables are validated at build/start by Astro's `env.schema` in `astro.config.mjs`.

`PUBLIC_SITE_URL` also feeds `security.allowedDomains`: only that hostname (plus `www.`, `localhost` and `127.0.0.1`) may set the request origin on `/api/lead`. Behind a reverse proxy this is what makes `X-Forwarded-Host`, `X-Forwarded-Proto` and `X-Forwarded-For` trusted, so the CSRF origin check and per-IP rate limiting see the real values. Add any extra hostnames (staging, preview) to that list in `astro.config.mjs`.

## HubSpot set-up

1. Create a form in HubSpot (Marketing → Forms) with these fields: `firstname`, `lastname`, `email`, `company`, `message`, and three **custom contact properties** named exactly `project_type` (dropdown or single-line text), `target_node` (single-line text), `project_timeline` (dropdown or text).
2. Copy the portal ID and the form GUID into `.env`.
3. Submissions go through `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}` with the visitor's `hubspotutk` cookie (if the HubSpot tracking script is ever added), page URL and consent text, so attribution and GDPR consent are recorded.
4. The dropdown values sent are listed in `src/i18n/en/contact.ts` (`projectTypes`, `timelines`). Create matching options in HubSpot or leave the properties as text.

Any other CRM: point `LEAD_WEBHOOK_URL` at a Zapier/Make/Pipedrive/custom endpoint. Payload shape: `{ source, receivedAt, ip, lead: { name, email, company, projectType, targetNode, timeline, message, consent, pageUri, hutk } }`.

## Spam protection

Layered, all server-side in `src/pages/api/lead.ts`:

1. Honeypot field (`website`) hidden from humans.
2. Time trap: JS stamps the form; submissions under 3 s or over 6 h are rejected (no-JS submissions skip this check).
3. Content heuristics (link count, common spam phrases).
4. In-memory rate limit: 5 submissions / 10 min / IP (per server process; use the host's rate limiting in front for multi-instance deployments).
5. Cloudflare Turnstile when both keys are set, verified via `siteverify` with the client IP.
6. Astro's built-in CSRF origin check on form-encoded posts (`security.checkOrigin`).

## Analytics and consent

- `src/scripts/consent.ts` implements Google **Consent Mode v2** in *basic* mode: no Google or LinkedIn script is loaded until the visitor accepts. The choice is stored in the `si_consent` cookie for 12 months; "Cookie settings" in the footer reopens the banner.
- Events: `window.siTrack('lead_submit' | 'calendar_booking' | 'calendar_open' | 'cta_click', params)`.
  - `lead_submit` → GA4 `generate_lead`, Google Ads conversion (`PUBLIC_GOOGLE_ADS_LEAD_LABEL`), LinkedIn conversion (`PUBLIC_LINKEDIN_LEAD_CONVERSION_ID`).
  - `calendar_booking` → GA4 `calendar_booking`, Google Ads booking conversion, LinkedIn booking conversion. Fired from the Calendly `calendly.event_scheduled` or Cal.com `bookingSuccessful` postMessage.
  - All events are also pushed to `window.dataLayer` for a future Google Tag Manager container.
- The banner is shown to every visitor (safest GDPR posture). If you want to show it only in the EEA/UK, add geo-detection at the edge (Cloudflare `CF-IPCountry`, Vercel `x-vercel-ip-country`) and set a `data-consent-required` attribute; the script is written to be extended there.

## Connecting silicon-partner.com (Namecheap)

The repository is private, so pick one of these two hosts. Both give HTTPS automatically.

### Option A: GitHub Pages (static; zero extra accounts)

Works on a private repository only with a paid GitHub plan (Pro/Team); on the Free plan the repository must be public. The lead form then posts straight to HubSpot from the browser (set `PUBLIC_HUBSPOT_PORTAL_ID` and `PUBLIC_HUBSPOT_FORM_GUID` as repository **Variables**), because there is no server for `/api/lead`.

1. In GitHub: **Settings → Pages → Source: GitHub Actions**. The `pages.yml` workflow deploys on every push to `main` and can be run by hand from **Actions → Deploy to GitHub Pages → Run workflow** (pick the branch).
2. Still in **Settings → Pages**, set **Custom domain** to `silicon-partner.com` and save.
3. In Namecheap: **Domain List → Manage → Advanced DNS**. Delete the default `CNAME www → parkingpage.namecheap.com` and the `URL Redirect` record, then add:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | Automatic |
| A | `@` | `185.199.109.153` | Automatic |
| A | `@` | `185.199.110.153` | Automatic |
| A | `@` | `185.199.111.153` | Automatic |
| AAAA | `@` | `2606:50c0:8000::153` | Automatic |
| AAAA | `@` | `2606:50c0:8001::153` | Automatic |
| AAAA | `@` | `2606:50c0:8002::153` | Automatic |
| AAAA | `@` | `2606:50c0:8003::153` | Automatic |
| CNAME | `www` | `ahmedramadancse.github.io.` | Automatic |

4. Back in **Settings → Pages**, wait for the DNS check to pass (minutes to an hour), then tick **Enforce HTTPS**. `www.silicon-partner.com` redirects to the apex automatically.

### Option B: Cloudflare Pages (recommended for production; keeps the server-side form)

Free, works with private repositories, runs `/api/lead` as a function, and Turnstile lives in the same dashboard.

1. Install the adapter and swap one line: `npm i @astrojs/cloudflare` and `adapter: cloudflare()` in `astro.config.mjs`.
2. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git → this repository**. Build command `npm run build`, output directory `dist`. Add the environment variables from `.env.example`.
3. **Custom domains → Add** `silicon-partner.com` and `www`. Cloudflare shows the records to add in Namecheap: a `CNAME @ → <project>.pages.dev` (Namecheap supports CNAME at the apex) and `CNAME www → <project>.pages.dev`. Or move the nameservers to Cloudflare and it manages DNS itself.

Vercel and Netlify work the same way with their adapters (`@astrojs/vercel`, `@astrojs/netlify`); each shows its own DNS records after you add the domain.

## Hosting

### Node (default: any VPS, Fly.io, Railway, Render, Docker)

```bash
npm ci && npm run build
HOST=0.0.0.0 PORT=4321 node dist/server/entry.mjs
```

A `Dockerfile` is included. Put a reverse proxy or CDN in front for TLS, compression and caching of `/_astro/*` (immutable, hashed) and `/og/*`.

### Vercel / Netlify / Cloudflare

Swap the adapter line in `astro.config.mjs`; nothing else changes:

```js
import vercel from '@astrojs/vercel';      // adapter: vercel()
import netlify from '@astrojs/netlify';    // adapter: netlify()
import cloudflare from '@astrojs/cloudflare'; // adapter: cloudflare()
```

Static pages are served from the CDN; `/api/lead` becomes a function. `public/_headers` is picked up by Netlify and Cloudflare Pages for security headers; on Vercel copy the same headers into `vercel.json`.

### Recommended security headers

Set at the host/CDN (see `public/_headers`):

```
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

A Content-Security-Policy is recommended once the third-party set is final. Starting point:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://snap.licdn.com https://challenges.cloudflare.com;
connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://px.ads.linkedin.com https://www.linkedin.com;
img-src 'self' data: https://www.google-analytics.com https://px.ads.linkedin.com https://www.googletagmanager.com;
frame-src https://challenges.cloudflare.com https://cal.com https://*.cal.com https://calendly.com https://*.calendly.com;
style-src 'self' 'unsafe-inline';
font-src 'self';
```

`'unsafe-inline'` for scripts can be replaced by nonces if the host supports injecting them; the only inline scripts are the theme initialiser and JSON-LD.

## Launch checklist

1. Fill every item in `docs/PLACEHOLDERS.md`; run `node scripts/lint-placeholders.mjs --strict` until it passes.
2. Set `PUBLIC_SITE_URL`, `PUBLIC_SHOW_PLACEHOLDERS=false`, CRM, analytics, calendar and Turnstile variables.
3. Legal review of `/privacy/`, `/terms/`, `/cookies/`; confirm processors and retention periods.
4. Replace `public/logo.svg`, `favicon.svg`, icons with final brand assets once the name is confirmed.
5. `npm run check && npm run build`; run `npm run lighthouse` against the deployed URL (target ≥ 95 in all four categories; current build: 96–100).
6. Submit `sitemap-index.xml` in Google Search Console and Bing Webmaster Tools; verify Organization and Service rich results.
7. Test the form end to end into HubSpot and the calendar booking event in GA4 DebugView.
