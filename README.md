# Silicon Partner website

Marketing website for a senior analog, mixed-signal and RF IC design services team in Cairo, Egypt: high-speed SerDes, DDR/LPDDR PHY, PLL/ADPLL, Bluetooth/BLE RF transceivers and UCIe die-to-die PHYs, from specification through tape-out and silicon bring-up.

Built with [Astro 7](https://astro.build) as a static site with one server endpoint for the lead form. No client framework; three small scripts. Lighthouse 96–100 across performance, accessibility, best practices and SEO on the current build.

> The brand is "Silicon Partner" (silicon-partner.com). Every value still to be supplied is marked `[LABEL: note]` in the source, highlighted on the site, and listed in `docs/PLACEHOLDERS.md`.

## Quick start

```bash
npm install
cp .env.example .env         # all keys optional in development
npm run dev                  # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run check` | Astro + TypeScript diagnostics |
| `npm run build` | Production build to `dist/` (pages, OG images, sitemap, robots) |
| `npm start` | Serve the production build (`node dist/server/entry.mjs`) |
| `npm run docs` | Regenerate `docs/COPY.md` and `docs/PLACEHOLDERS.md` from source |
| `npm run lighthouse -- <url>` | Mobile Lighthouse on key pages (needs Chromium) |
| `node scripts/lint-placeholders.mjs --strict` | Fail while any placeholder remains (launch gate) |

## Documentation

| Document | Contents |
| --- | --- |
| [docs/SITEMAP.md](docs/SITEMAP.md) | Full site map, URLs, keywords, schema.org, conversion paths |
| [docs/COPY.md](docs/COPY.md) | Final copy for every page, generated from the dictionaries and markdown |
| [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | Colours, type scale, spacing, components, graphics, motion, accessibility |
| [docs/PLACEHOLDERS.md](docs/PLACEHOLDERS.md) | Every placeholder to fill, grouped by page, with file and line |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Environment variables, HubSpot, analytics and consent, spam protection, hosting, security headers, launch checklist |
| [docs/I18N.md](docs/I18N.md) | How to add Simplified Chinese, Japanese and Korean |

## Project layout

```
astro.config.mjs          site URL, adapter, i18n, fonts, typed env schema, markdown pipeline
src/site.config.ts        brand and company facts (single source of truth)
src/i18n/                 locale registry and per-page copy dictionaries (en/)
src/content/              markdown collections: insights/, case-studies/ (per locale)
src/layouts/Base.astro    document shell: fonts, SEO head, header, footer, consent
src/components/           UI components; graphics/ holds the procedural SVG motifs
src/pages/                routes (file-based); api/lead.ts is the only server route
src/scripts/              client scripts: consent.ts, lead-form.ts
src/lib/                  SEO/JSON-LD, placeholders, lead validation and CRM delivery
src/styles/               tokens.css (design tokens), base.css (reset, typography, utilities)
scripts/                  docs export, placeholder lint, Lighthouse runner
docs/                     deliverable documents
public/                   favicon, logo, manifest, _headers
```

## How copy and placeholders work

- All page copy lives in `src/i18n/en/*.ts`; pages contain no prose. Long-form content (insights, case studies) is markdown in `src/content/`.
- Strings that may contain placeholders are rendered through `<Copy text={…} />`, which escapes HTML and wraps `[LABEL: note]` in a highlighted `<mark>`. Markdown gets the same treatment from a rehype plugin.
- `PUBLIC_SHOW_PLACEHOLDERS=false` renders placeholders as plain text; `scripts/lint-placeholders.mjs --strict` blocks a release while any remain.

## Content rules baked into the copy

No invented clients, logos, testimonials, statistics, tape-out counts, success rates, certifications or awards. Technical claims are specific and checkable, with `[NUMBER: to be supplied]` where a figure is pending. The company is new; only the technical leads' 15+ years of experience is stated. We design; foundries fabricate.

## License

Site code: proprietary to the company. Fonts: SIL Open Font License (see `src/assets/fonts/LICENSE-*.txt`).
