/** Site-relative routes (locale-neutral). Use with localizePath() for non-default locales. */
export const routes = {
  home: '/',
  capabilities: '/capabilities/',
  capability: (slug: string) => `/capabilities/${slug}/`,
  engagement: '/engagement-models/',
  engagementModel: (id: string) => `/engagement-models/#${id}`,
  caseStudies: '/case-studies/',
  caseStudy: (slug: string) => `/case-studies/${slug}/`,
  security: '/security/',
  team: '/team/',
  insights: '/insights/',
  insight: (slug: string) => `/insights/${slug}/`,
  careers: '/careers/',
  contact: '/contact/',
  thankYou: '/thank-you/',
  privacy: '/privacy/',
  terms: '/terms/',
  cookies: '/cookies/',
  leadApi: '/api/lead',
} as const;

/** Open Graph image path for a page key (see src/pages/og/[...key].png.ts). */
export function ogImagePath(key: string): string {
  return `/og/${key}.png`;
}
