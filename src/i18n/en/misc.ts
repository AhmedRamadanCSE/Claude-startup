import { SITE } from '../../site.config.ts';

export default {
  thankYou: {
    seo: {
      title: `Request received | ${SITE.name}`,
      description: 'Your NDA call request has been received. A technical lead will reply within one business day.',
    },
    eyebrow: 'Thank you',
    title: 'Request received.',
    body: `A technical lead will reply within ${SITE.replyWithin}. If you would rather pick a time now, open the booking calendar.`,
    calendarCta: 'Book a time',
    homeCta: 'Back to home',
    meanwhile: 'In the meantime',
    links: [
      { label: 'Read how we protect client IP', href: '/security/' },
      { label: 'Compare engagement models', href: '/engagement-models/' },
      { label: 'Browse technical insights', href: '/insights/' },
    ],
  },
  notFound: {
    seo: {
      title: `Page not found | ${SITE.name}`,
      description: 'The page you requested does not exist.',
    },
    eyebrow: '404',
    title: 'No signal on this address.',
    body: 'The page you requested does not exist or has moved. Try one of these instead.',
    homeCta: 'Back to home',
    links: [
      { label: 'Capabilities', href: '/capabilities/' },
      { label: 'Engagement models', href: '/engagement-models/' },
      { label: 'Request an NDA call', href: '/contact/' },
    ],
  },
} as const;
