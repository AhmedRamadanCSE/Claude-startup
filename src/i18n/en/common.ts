import { SITE } from '../../site.config.ts';

export default {
  skipToContent: 'Skip to content',
  brand: SITE.name,
  tagline: SITE.tagline,

  nav: {
    capabilities: 'Capabilities',
    engagement: 'Engagement models',
    caseStudies: 'Case studies',
    security: 'Security',
    team: 'Team',
    insights: 'Insights',
    careers: 'Careers',
    contact: 'Contact',
    cta: 'Request an NDA call',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    menuLabel: 'Main navigation',
  },

  theme: {
    label: 'Theme',
    toDark: 'Switch to dark theme',
    toLight: 'Switch to light theme',
  },

  language: {
    label: 'Language',
    comingSoon: 'Additional languages are in preparation.',
  },

  footer: {
    about: `${SITE.name} is a senior analog, mixed-signal and RF IC design team based in ${SITE.location.city}, ${SITE.location.country}. We design integrated circuits from specification through tape-out and silicon bring-up. Fabrication is performed by the foundry you choose.`,
    columns: {
      capabilities: 'Capabilities',
      company: 'Company',
      resources: 'Resources',
      legal: 'Legal',
    },
    links: {
      engagement: 'Engagement models',
      caseStudies: 'Case studies',
      security: 'Security & IP protection',
      team: 'Team',
      careers: 'Careers',
      insights: 'Insights',
      contact: 'Request an NDA call',
      privacy: 'Privacy policy',
      terms: 'Terms of use',
      cookies: 'Cookie policy',
      cookieSettings: 'Cookie settings',
    },
    contactHeading: 'Contact',
    locationLine: `${SITE.location.city}, ${SITE.location.country} · ${SITE.location.timezoneLabel}`,
    replyLine: `We reply within ${SITE.replyWithin}.`,
    copyright: (year: number) => `© ${year} ${SITE.legalName}. All rights reserved.`,
    designNote: 'We design. Foundries fabricate.',
  },

  consent: {
    title: 'Cookies and analytics',
    body: 'We use cookies for analytics and advertising measurement only after you agree. Essential cookies for the site to work are always on.',
    accept: 'Accept all',
    reject: 'Reject non-essential',
    settings: 'Cookie policy',
    ariaLabel: 'Cookie consent',
  },

  breadcrumbs: {
    home: 'Home',
    label: 'Breadcrumb',
  },

  actions: {
    readMore: 'Read more',
    learnMore: 'Learn more',
    allCapabilities: 'All capabilities',
    backTo: (name: string) => `Back to ${name}`,
    requestCall: 'Request an NDA call',
    seeCapabilities: 'See our capabilities',
    contactUs: 'Contact us',
    download: 'Download',
  },

  labels: {
    processNodes: 'Process nodes',
    deliverables: 'What we deliver',
    typicalSpecs: 'Typical specifications we have delivered',
    problems: 'Problems we solve',
    specParameter: 'Parameter',
    specValue: 'Value',
    challenge: 'Challenge',
    ourRole: 'Our role',
    result: 'Result',
    engagement: 'Engagement',
    area: 'Area',
    node: 'Node',
    duration: 'Duration',
    published: 'Published',
    readingTime: (min: number) => `${min} min read`,
    placeholderHint: 'Placeholder: to be supplied before launch',
    ndaNote: 'All figures are shared with supporting data under NDA.',
  },
} as const;
