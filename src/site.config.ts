/**
 * Single source of truth for brand and company facts used across the site.
 * Keep this file free of Astro/Vite-specific imports: it is also loaded by
 * plain Node in scripts/export-copy.mjs.
 *
 * Placeholders use the form LABEL: note inside square brackets. See docs/PLACEHOLDERS.md.
 */
export const SITE = {
  /** Brand name. Domain: silicon-partner.com. */
  name: 'Silicon Partner',
  legalName: '[LEGAL ENTITY NAME: to be supplied]',
  tagline: 'Analog, mixed-signal and RF IC design. Spec to silicon.',
  description:
    'Senior analog, mixed-signal and RF IC design services from Cairo, Egypt: high-speed SerDes, DDR/LPDDR PHY, PLL and ADPLL, Bluetooth/BLE transceivers and UCIe die-to-die interfaces, delivered from specification through tape-out and silicon bring-up.',

  defaultLocale: 'en',
  /** Locales planned for later. Only `en` is published; see docs/I18N.md. */
  plannedLocales: ['zh-cn', 'ja', 'ko'],

  location: {
    city: 'Cairo',
    country: 'Egypt',
    countryCode: 'EG',
    address: '[ADDRESS: street address to be supplied]',
    timezone: 'Africa/Cairo',
    timezoneLabel: 'UTC+2 (UTC+3 during daylight saving time)',
  },

  contact: {
    email: '[EMAIL: general contact address to be supplied]',
    salesEmail: '[EMAIL: sales/NDA contact address to be supplied]',
    careersEmail: '[EMAIL: careers address to be supplied]',
    privacyEmail: '[EMAIL: privacy/DPO address to be supplied]',
    phone: '[PHONE: to be supplied]',
    linkedin: '[LINKEDIN URL: company page to be supplied]',
  },

  /** Service promise used on the contact page and in schema.org markup. */
  replyWithin: 'one business day',

  /** Experience statement that is allowed verbatim. Never imply the company itself is 15 years old. */
  leadExperience: '15+ years',

  /** Working-hours overlap statement (Cairo is UTC+2/+3). */
  overlap: {
    europe: 'Full working-day overlap with Central and Eastern Europe; near-full with the UK.',
    us: 'Four to five hours of overlap with the US East Coast each morning.',
    asia: 'Three to four hours of overlap with Japan, Korea, Taiwan and Singapore each afternoon.',
  },
} as const;

export type SiteConfig = typeof SITE;
