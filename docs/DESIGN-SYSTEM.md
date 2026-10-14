# Design system

Premium, technical, calm. Dark-first with a light mode, one accent colour, generous whitespace and a precise grid. All tokens live in `src/styles/tokens.css`; base styles and utilities in `src/styles/base.css`; component styles are scoped inside each `.astro` component.

## 1. Colour

One accent: **signal teal**. Everything else is a neutral blue-grey scale. Contrast ratios are computed against the page background and all text pairs meet WCAG 2.1 AA (≥ 4.5:1 for body text, ≥ 3:1 for large text and UI borders).

### Dark theme (default)

| Token | Value | Use | Contrast on `--color-bg` |
| --- | --- | --- | --- |
| `--color-bg` | `#0a0e13` | Page background | — |
| `--color-bg-elevated` | `#0f141b` | Tinted sections, figure frames | — |
| `--color-surface` | `#131a22` | Cards, tables, form container | — |
| `--color-surface-2` | `#1a2230` | Hover state, code background | — |
| `--color-surface-3` | `#212b3a` | Pressed / strong surface | — |
| `--color-border` | `#243040` | Hairlines | — |
| `--color-border-strong` | `#33425a` | Inputs, badges | 3.1:1 |
| `--color-text` | `#e8edf2` | Headings, body | 16.1:1 |
| `--color-text-muted` | `#a9b5c2` | Secondary text, ledes | 9.3:1 |
| `--color-text-faint` | `#8593a3` | Captions, labels | 6.0:1 |
| `--color-accent` | `#2dd4bf` | Links, eyebrows, primary button background | 10.9:1 |
| `--color-accent-strong` | `#5eead4` | Hover | 13.0:1 |
| `--color-accent-ink` | `#052a26` | Text on accent | 9.7:1 on accent |
| `--color-accent-soft` | `rgb(45 212 191 / 0.12)` | Tints, focus ring | — |
| `--color-error` | `#fb7185` | Validation | 7.4:1 |
| `--color-ph` / `--color-ph-soft` | `#f5c15c` / 14 % | Placeholder highlight (removed at launch) | 11.4:1 |

### Light theme (`:root[data-theme="light"]`)

| Token | Value | Contrast on `#ffffff` |
| --- | --- | --- |
| `--color-bg` | `#ffffff` | — |
| `--color-bg-elevated` | `#f8fafc` | — |
| `--color-surface` | `#f3f6f9` | — |
| `--color-border` / `-strong` | `#d9e0e8` / `#b7c3d1` | 1.4:1 / 1.9:1 (decorative) |
| `--color-text` | `#0f1720` | 18.4:1 |
| `--color-text-muted` | `#45556a` | 7.9:1 |
| `--color-text-faint` | `#5b6b7f` | 5.6:1 |
| `--color-accent` | `#0f766e` | 5.6:1 (text and button background with white text) |
| `--color-accent-strong` | `#115e59` | 7.5:1 |
| `--color-error` | `#be123c` | 6.4:1 |

Graphics use `--g-trace` (accent), `--g-trace-2` (neutral), `--g-grid`, `--g-axis`, `--g-label`, `--g-mask` so every figure recolours with the theme.

### Theme behaviour

Dark is the default regardless of OS preference (dark-first). A toggle in the header stores the choice in `localStorage` (`si_theme`); an inline script applies it before first paint to avoid a flash. `color-scheme` is set per theme so native form controls and scrollbars follow.

## 2. Typography

| Role | Family | Weights | Notes |
| --- | --- | --- | --- |
| Headings | **Schibsted Grotesk** (variable) | 600–660 | Modern grotesk; tight tracking (−0.022 em), `text-wrap: balance` |
| Body | **Inter** (variable) | 400–600 | `cv11`, `ss01` for a cleaner "a" and "t"; line-height 1.6 |
| Specs & numbers | **JetBrains Mono** (variable) | 400–500 | Tabular figures, slashed zero (`zero`, `ss02`) |

Fonts are self-hosted Latin subsets (SIL OFL) through Astro's font pipeline, which generates metric-compatible fallbacks (`size-adjust`, `ascent-override`) so text does not shift when the webfont arrives. Heading and body fonts are preloaded.

### Fluid type scale

| Token | Range (360 px → 1280 px) | Used for |
| --- | --- | --- |
| `--text-xs` | 12 px | Eyebrows, badges, captions, table headers |
| `--text-sm` | 14 px | Card bodies, nav, buttons, tables |
| `--text-base` | 16 → 17 px | Body |
| `--text-lg` | 18 → 20 px | Ledes, card titles |
| `--text-xl` | 20 → 24 px | h3 |
| `--text-2xl` | 24 → 32 px | Prose h2 |
| `--text-3xl` | 30 → 44 px | h2 |
| `--text-4xl` | 36 → 60 px | h1 |
| `--text-5xl` | 42 → 76 px | Hero display |

Line heights: `--leading-tight` 1.08 (display), `--leading-snug` 1.22 (headings), `--leading-normal` 1.6 (body), `--leading-relaxed` 1.72 (ledes, prose).

## 3. Spacing and layout

4 px grid: `--space-1` (4 px) … `--space-24` (96 px). Section rhythm `--section-space: clamp(64px, 9vw, 120px)`; compact `--section-space-sm`.

| Token | Value |
| --- | --- |
| `--container-max` | 76 rem (1216 px) |
| `--container-narrow` | 46 rem (prose, forms, legal) |
| `--gutter` | `clamp(16px, 5vw, 40px)` |
| `--grid-gap` | `clamp(16px, 2.5vw, 28px)` |
| `--radius-sm/md/lg/xl` | 4 / 8 / 12 / 20 px |
| `--header-height` | 64 px |

Layout primitives (`base.css`): `.container`, `.section`, `.section--tint`, `.grid--2/3/4` (collapse to 1 column < 640 px, 2 columns < 1024 px), `.split` (5/7 or even, stacks < 896 px), `.stack` (vertical rhythm), `.cluster` (inline wrap).

Breakpoints: 40 em (640 px), 48 em (768 px), 56 em (896 px), 64 em (1024 px). Mobile-first; no horizontal scroll at 320 px.

## 4. Components

| Component | File | Notes |
| --- | --- | --- |
| Button | `components/Button.astro` | `primary` (accent), `secondary` (outline), `ghost`; sizes `sm/md/lg`; renders `<a>` or `<button>` |
| SectionHead | `components/SectionHead.astro` | Eyebrow + heading + lede; `as` h1/h2/h3; optional centred |
| Copy | `components/Copy.astro` | Renders a string with `[PLACEHOLDER]` highlighting; use for all dictionary strings that may contain placeholders |
| Card | `.card`, `.card--interactive` in `base.css` | Surface + border; interactive variant lifts and tints on hover; stretched link via `.card__title a::after` |
| CapabilityCard / EngagementCard / CaseStudyCard / ArticleCard | `components/*.astro` | Typed cards fed from dictionaries and collections |
| SpecTable | `components/SpecTable.astro` | Parameter/value table; values in mono |
| Steps | `components/Steps.astro` | Numbered 4-up process |
| CtaBand | `components/CtaBand.astro` | Full-width closing CTA with grid texture |
| Breadcrumbs | `components/Breadcrumbs.astro` | Emits BreadcrumbList JSON-LD |
| Header / Footer | `components/Header.astro`, `Footer.astro` | Sticky blurred header, mobile menu (`aria-expanded`, Escape to close), footer with cookie settings |
| ThemeToggle | `components/ThemeToggle.astro` | Sun/moon, `aria-label` updates |
| CookieConsent | `components/CookieConsent.astro` + `scripts/consent.ts` | GDPR banner, Consent Mode v2 |
| LeadForm | `components/LeadForm.astro` + `scripts/lead-form.ts` | Progressive enhancement, inline errors, honeypot, time trap, optional Turnstile |
| CalendarEmbed | `components/CalendarEmbed.astro` | Click-to-load Cal.com/Calendly iframe, booking event listener |
| LegalDoc | `components/LegalDoc.astro` | Renders structured legal documents with tables |
| Figure | `components/graphics/Figure.astro` | Instrument-style frame with mono title bar and caption |
| Badge, eyebrow, spec-list, prose | `base.css` | Utility classes |

Form controls: `.input`, `.select`, `.textarea`, `.field`, `.field__error`; focus ring uses the accent at 3 px; `aria-invalid` turns the border red.

## 5. Graphics (vector motifs)

All motifs are procedurally generated SVG at build time (seeded PRNG, so output is deterministic), themed through CSS variables, and respect `prefers-reduced-motion`.

| Motif | Component | Where | Motion |
| --- | --- | --- | --- |
| NRZ eye diagram with mask and sampling cursor | `EyeDiagram.astro` | Home hero, SerDes page | Traces fade in; cursor drifts (7 s) |
| PLL phase-noise plot with loop bandwidth, spur and integration band | `PhaseNoise.astro` | PLL/ADPLL page | Static |
| Die-to-die chiplet floorplan with UCIe modules and bump arrays | `ChipletLayout.astro` | Home (why us), UCIe page | Lane dash flow (1.8 s) |
| PLL lock: REF/FB clocks and UP pulse converging | `ClockWaveform.astro` | Engagement models | Lock animation (6 s loop) |
| DDR write timing: DQS centred in DQ eyes, per-bit skew | `DdrTiming.astro` | DDR PHY page | Static |
| 2.4 GHz BLE band plan with GFSK lobe and mask | `RfSpectrum.astro` | Bluetooth page | Static |
| ADC staircase with DNL/INL | `AdcStaircase.astro` | Other AMS page | Static |

No stock photography. Team photos are the only raster images and are placeholders until supplied.

## 6. Motion

`--ease-out: cubic-bezier(0.2, 0.7, 0.2, 1)`; durations 150 / 250 / 600 ms. Only opacity, transform and colour are animated. Under `prefers-reduced-motion: reduce`, all animations and transitions are disabled globally and the SVG animations render their final state.

## 7. Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip link, one `h1` per page, logical heading order.
- Visible focus (`:focus-visible` accent outline, 3 px offset); focus is moved to success/error messages after form submission.
- All interactive elements are native buttons/links with accessible names; mobile menu uses `aria-expanded`/`aria-controls`.
- Decorative SVGs are `aria-hidden`; informative ones have `role="img"` and a label.
- Colour is never the only carrier of meaning (placeholders also use dashed borders and mono type; errors include text).
- Tables use `scope`; forms use explicit labels, hints and `aria-describedby`.
- Lighthouse accessibility 100 on audited pages; verify again after filling placeholders.

## 8. Placeholder treatment

`[LABEL: note]` strings render as `<mark class="ph">` with amber dashed styling and a tooltip. Set `PUBLIC_SHOW_PLACEHOLDERS=false` to render them as plain text (for screenshots), and run `node scripts/lint-placeholders.mjs --strict` in CI to block a launch while any remain.
