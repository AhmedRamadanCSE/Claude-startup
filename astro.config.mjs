// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import { unified } from '@astrojs/markdown-remark';
import rehypePlaceholders from './src/lib/rehype-placeholders.mjs';

const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

/**
 * Site URL used for canonical links, sitemap, robots.txt and Open Graph.
 * Set PUBLIC_SITE_URL in .env (see .env.example); defaults to the production domain.
 */
const site = PUBLIC_SITE_URL || 'https://silicon-partner.com';
const siteHost = new URL(site).hostname;

export default defineConfig({
  site,
  // Pages are prerendered to static HTML. Only src/pages/api/lead.ts opts out
  // (export const prerender = false) and runs on the server via the adapter.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },

  /**
   * Hosts whose Host / X-Forwarded-* headers may define the request URL on the
   * on-demand route (/api/lead). Needed for the CSRF origin check and for the
   * client IP used by rate limiting to be correct behind a reverse proxy.
   */
  security: {
    checkOrigin: true,
    allowedDomains: [{ hostname: siteHost }, { hostname: `www.${siteHost}` }, { hostname: 'localhost' }, { hostname: '127.0.0.1' }],
  },

  /**
   * Internationalization.
   * English is the only published locale today. To add a locale:
   *   1. add its code to `locales` (e.g. 'zh-cn', 'ja', 'ko');
   *   2. add a dictionary under src/i18n/<code>/ (copy src/i18n/en/);
   *   3. add content under src/content/<collection>/<code>/;
   *   4. add the code to `sitemap.i18n.locales` below.
   * See docs/I18N.md for the full procedure.
   */
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },

  markdown: {
    // remark/rehype pipeline; rehypePlaceholders highlights [PLACEHOLDER: ...] text in markdown
    // content the same way renderCopy() does for dictionary strings.
    processor: unified({ rehypePlugins: [rehypePlaceholders] }),
    shikiConfig: { theme: 'github-dark-dimmed' },
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/thank-you') && !page.includes('/404') && !page.includes('/api/'),
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en' },
      },
    }),
  ],

  /**
   * Self-hosted, subset variable fonts (SIL Open Font License; see src/assets/fonts/LICENSE-*.txt).
   * Astro emits @font-face rules, optimized metric-compatible fallbacks and preload hints.
   */
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Schibsted Grotesk',
      cssVariable: '--font-heading',
      fallbacks: ['Arial', 'Helvetica', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/schibsted-grotesk-latin-wght-normal.woff2'],
            weight: '400 900',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-body',
      fallbacks: ['Arial', 'Helvetica', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/inter-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/jetbrains-mono-latin-wght-normal.woff2'],
            weight: '100 800',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],

  /**
   * Typed environment variables. Public values are inlined into the client bundle;
   * secrets are only readable on the server (src/pages/api/lead.ts).
   */
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: 'client', access: 'public', optional: true, default: site }),
      PUBLIC_GA4_MEASUREMENT_ID: envField.string({ context: 'client', access: 'public', optional: true, default: '' }),
      PUBLIC_GOOGLE_ADS_CONVERSION_ID: envField.string({ context: 'client', access: 'public', optional: true, default: '' }),
      PUBLIC_GOOGLE_ADS_LEAD_LABEL: envField.string({ context: 'client', access: 'public', optional: true, default: '' }),
      PUBLIC_GOOGLE_ADS_BOOKING_LABEL: envField.string({ context: 'client', access: 'public', optional: true, default: '' }),
      PUBLIC_LINKEDIN_PARTNER_ID: envField.string({ context: 'client', access: 'public', optional: true, default: '' }),
      PUBLIC_LINKEDIN_LEAD_CONVERSION_ID: envField.string({ context: 'client', access: 'public', optional: true, default: '' }),
      PUBLIC_LINKEDIN_BOOKING_CONVERSION_ID: envField.string({ context: 'client', access: 'public', optional: true, default: '' }),
      PUBLIC_CALENDAR_URL: envField.string({ context: 'client', access: 'public', optional: true, default: '' }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public', optional: true, default: '' }),
      PUBLIC_SHOW_PLACEHOLDERS: envField.boolean({ context: 'client', access: 'public', optional: true, default: true }),
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      HUBSPOT_PORTAL_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      HUBSPOT_FORM_GUID: envField.string({ context: 'server', access: 'secret', optional: true }),
      LEAD_WEBHOOK_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      LEAD_WEBHOOK_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      LEAD_NOTIFY_WEBHOOK_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      REQUIRE_WORK_EMAIL: envField.boolean({ context: 'server', access: 'secret', optional: true, default: true }),
    },
  },
});
