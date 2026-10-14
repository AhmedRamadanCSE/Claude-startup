# Site map

Clean URLs, trailing slash, English at the root. Future locales mount under `/zh-cn/`, `/ja/`, `/ko/` (see I18N.md). Every page has a unique title, meta description, canonical URL, Open Graph image (`/og/<key>.png`) and schema.org markup. `sitemap-index.xml` and `robots.txt` are generated at build time.

| # | URL | Page | Purpose and primary CTA | Target keywords | Schema.org |
| --- | --- | --- | --- | --- | --- |
| 1 | `/` | Home | Value proposition, proof strip, capability grid, process, why us, engagement teasers, case-study teasers, security summary, final CTA. CTA: **Request an NDA call**. | analog IC design services, mixed-signal design services, offshore analog design team | Organization, WebSite, WebPage, Service ×5 |
| 2 | `/capabilities/` | Capabilities index | Overview of the five core areas plus other AMS; what is common to every engagement. | analog IC design services | Service ×6 |
| 2.1 | `/capabilities/serdes/` | High-speed SerDes | Problems, typical specs, deliverables, verification, nodes. | SerDes design services | Service, BreadcrumbList |
| 2.2 | `/capabilities/ddr-phy/` | DDR / LPDDR PHY | Same structure. | DDR PHY design | Service, BreadcrumbList |
| 2.3 | `/capabilities/pll-adpll/` | PLL and ADPLL | Same structure. | PLL design services, ADPLL design | Service, BreadcrumbList |
| 2.4 | `/capabilities/bluetooth-ble/` | Bluetooth / BLE RF transceivers | Same structure. | Bluetooth RF IC design | Service, BreadcrumbList |
| 2.5 | `/capabilities/ucie/` | UCIe die-to-die PHY | Same structure. | UCIe PHY design | Service, BreadcrumbList |
| 2.6 | `/capabilities/analog-mixed-signal/` | Other analog and mixed-signal | Data converters, PMIC, clocking, sensor front-ends, layout. | mixed-signal design services | Service, BreadcrumbList |
| 3 | `/engagement-models/` | Engagement models | Four models (anchors `#dedicated-team`, `#fixed-scope-block`, `#ip-porting`, `#bring-up`), how pricing works, comparison table. | IP porting to new process node, offshore analog design team | Service ×4 |
| 4 | `/case-studies/` | Case studies | Template explanation and anonymized entries. | — | WebPage |
| 4.x | `/case-studies/<slug>/` | Case study | Challenge / Our role / Result, metrics, node, engagement. | — | WebPage |
| 5 | `/security/` | Security & IP protection | Seven controls with audit note. | — | WebPage |
| 6 | `/team/` | Team | Leadership bios, team numbers, principles, location. | — | Person ×3 |
| 7 | `/insights/` | Insights | Technical article index. | — | WebPage |
| 7.x | `/insights/<slug>/` | Article | Full article with related reading. | per article | TechArticle |
| 8 | `/careers/` | Careers | Offer, open roles, how to apply. | — | WebPage |
| 9 | `/contact/` | Request an NDA call | Lead form, what happens next, direct contact, calendar booking. | — | ContactPage |
| 9.1 | `/thank-you/` | Thank you | Confirmation and calendar (noindex). | — | — |
| 10.1 | `/privacy/` | Privacy policy | GDPR-oriented policy. | — | WebPage |
| 10.2 | `/terms/` | Terms of use | Website terms. | — | WebPage |
| 10.3 | `/cookies/` | Cookie policy | Cookie table and settings link. | — | WebPage |
| — | `/404/` | Not found | Custom 404 (served as `404.html`). | — | — |

## Non-page routes

| Route | Type | Notes |
| --- | --- | --- |
| `/api/lead` | Server endpoint (POST) | The only on-demand route. Validates, checks spam, submits to HubSpot and/or a webhook. JSON or form-encoded. |
| `/og/<key>.png` | Prerendered image | 1200×630 Open Graph image per page, generated at build time. |
| `/robots.txt` | Prerendered | Points to the sitemap; disallows `/api/` and `/thank-you/`. |
| `/sitemap-index.xml`, `/sitemap-0.xml` | Generated | Excludes thank-you, 404 and API. |

## Navigation

- **Header:** Capabilities · Engagement models · Case studies · Security · Team · Insights · [Request an NDA call] · theme toggle. Careers and Contact appear in the mobile menu.
- **Footer:** Capabilities (6) · Company (Engagement models, Case studies, Security, Team, Careers) · Resources (Insights, Request an NDA call) · Contact · Legal (Privacy, Terms, Cookies, Cookie settings) · language switcher.

## Conversion paths

1. Any page → header CTA or CTA band → `/contact/` → form submit → `/thank-you/` (JS: inline success) → calendar booking.
2. Capability page → capability-specific CTA band → `/contact/`.
3. Insights article → CTA band → `/contact/`.

Conversion events: `lead_submit` (GA4 `generate_lead`, Google Ads conversion, LinkedIn conversion) and `calendar_booking` (GA4 event, Google Ads conversion, LinkedIn conversion). See DEPLOYMENT.md.
