import { SITE } from '../../site.config.ts';

export interface LegalSection {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
  table?: { columns: readonly string[]; rows: readonly (readonly string[])[] };
}

export interface LegalDoc {
  seo: { title: string; description: string };
  title: string;
  updated: string;
  intro: string;
  sections: readonly LegalSection[];
  reviewNote: string;
}

const reviewNote = '[LEGAL REVIEW: this document is a draft to be reviewed and approved by legal counsel before launch]';

export const privacy: LegalDoc = {
  seo: {
    title: `Privacy Policy | ${SITE.name}`,
    description: `How ${SITE.name} collects, uses and protects personal data on this website and in business communications, including your rights under the GDPR.`,
  },
  title: 'Privacy policy',
  updated: '[DATE: last updated, to be supplied]',
  intro: `This policy explains how ${SITE.legalName} ("${SITE.name}", "we") processes personal data when you visit this website, contact us or do business with us. We keep it short and specific. Where the General Data Protection Regulation (GDPR) applies to you, this policy is written to meet it.`,
  sections: [
    {
      title: '1. Who is responsible',
      paragraphs: [
        `The data controller is ${SITE.legalName}, ${SITE.location.address}, ${SITE.location.city}, ${SITE.location.country}. You can reach us about privacy at ${SITE.contact.privacyEmail}.`,
        '[EU REPRESENTATIVE: if required under GDPR Article 27, name and address of the EU representative to be supplied; otherwise delete this paragraph.]',
      ],
    },
    {
      title: '2. What we collect and why',
      table: {
        columns: ['Data', 'Purpose', 'Legal basis', 'Retention'],
        rows: [
          ['Contact form: name, work email, company, project type, target node, timeline, message', 'Responding to your request, preparing an NDA and a proposal', 'Pre-contractual steps at your request (GDPR Art. 6(1)(b)); legitimate interest in responding to business enquiries (Art. 6(1)(f))', '[NUMBER: to be supplied] months after the last contact, or for the duration of a contract plus statutory retention periods'],
          ['Calendar booking: name, email, chosen time, notes', 'Scheduling a call', 'Pre-contractual steps at your request (Art. 6(1)(b))', 'As above; the booking provider keeps its own copy under its policy'],
          ['Analytics data: pages viewed, approximate location, device and browser, referring site', 'Understanding how the site is used and improving it', 'Consent (Art. 6(1)(a)); only after you accept analytics cookies', 'Up to [NUMBER: to be supplied] months in the analytics provider'],
          ['Advertising measurement: conversion events, ad click identifiers', 'Measuring whether our advertising leads to enquiries', 'Consent (Art. 6(1)(a)); only after you accept advertising cookies', 'Per provider, typically up to [NUMBER: to be supplied] days'],
          ['Server logs: IP address, request URL, timestamp, user agent', 'Security, abuse prevention and fault diagnosis', 'Legitimate interest in running a secure service (Art. 6(1)(f))', '[NUMBER: to be supplied] days'],
          ['Job applications: CV and anything you send us', 'Assessing your application', 'Pre-contractual steps at your request (Art. 6(1)(b))', '[NUMBER: to be supplied] months after the decision unless you ask us to keep it'],
        ],
      },
    },
    {
      title: '3. Cookies and similar technologies',
      paragraphs: [
        'Essential cookies that make the site work are set without consent. Analytics and advertising cookies are set only after you accept them in the cookie banner. You can change your choice at any time via "Cookie settings" in the footer. The cookie policy lists every cookie we use.',
      ],
    },
    {
      title: '4. Who we share data with',
      items: [
        'CRM: HubSpot, Inc. (United States) stores contact-form submissions. [PROCESSOR: confirm CRM and data-processing agreement]',
        'Calendar booking: [CALENDAR PROVIDER: e.g. Cal.com, Inc. or Calendly LLC, to be supplied]',
        'Analytics: Google Ireland Limited (Google Analytics 4), with IP anonymisation and data-sharing settings disabled',
        'Advertising measurement: Google Ireland Limited (Google Ads) and LinkedIn Ireland Unlimited Company (LinkedIn Insight Tag)',
        'Hosting and content delivery: [HOSTING PROVIDER: to be supplied]',
        'Spam protection: Cloudflare, Inc. (Turnstile), if enabled',
        'Professional advisers, auditors and authorities where the law requires it',
      ],
      paragraphs: ['We do not sell personal data. Processors act on our written instructions under data-processing agreements.'],
    },
    {
      title: '5. International transfers',
      paragraphs: [
        `We are based in ${SITE.location.country}. Some processors listed above are in the United States or other countries outside the European Economic Area. Where we transfer personal data from the EEA or the United Kingdom, we rely on the European Commission's Standard Contractual Clauses, the EU-US Data Privacy Framework where the recipient is certified, or another lawful transfer mechanism. Copies of the safeguards are available on request.`,
      ],
    },
    {
      title: '6. Your rights',
      paragraphs: [
        'Where the GDPR or a similar law applies, you can ask us to access, correct, delete or restrict the processing of your personal data, object to processing based on legitimate interest, receive your data in a portable format, and withdraw consent at any time without affecting processing before withdrawal.',
        `To exercise a right, email ${SITE.contact.privacyEmail}. We respond within one month. You can also complain to your local data-protection authority. [SUPERVISORY AUTHORITY: name the lead authority if an EU representative or establishment exists]`,
      ],
    },
    {
      title: '7. Security',
      paragraphs: [
        'We protect personal data with encryption in transit and at rest, access limited to named staff, multi-factor authentication and logging. Our security practices for client design data are described on the Security page.',
      ],
    },
    {
      title: '8. Children',
      paragraphs: ['This website is for businesses. We do not knowingly collect data from anyone under 16.'],
    },
    {
      title: '9. Changes',
      paragraphs: ['We will post changes to this policy here and update the date above. Material changes will be announced on the site before they take effect.'],
    },
  ],
  reviewNote,
};

export const terms: LegalDoc = {
  seo: {
    title: `Terms of Use | ${SITE.name}`,
    description: `Terms governing the use of the ${SITE.name} website. Design services are provided under separate written agreements.`,
  },
  title: 'Terms of use',
  updated: '[DATE: last updated, to be supplied]',
  intro: `These terms govern your use of this website, operated by ${SITE.legalName}. Design services, deliverables, pricing and intellectual property are governed only by the written agreement we sign with you, never by this website.`,
  sections: [
    {
      title: '1. Use of the website',
      items: [
        'You may browse this site and use the contact and booking features for legitimate business enquiries.',
        'You may not scrape the site, probe or disrupt it, submit spam or false information, or use it to infringe anyone\'s rights.',
      ],
    },
    {
      title: '2. No offer, no advice',
      paragraphs: [
        'Content on this site describes our capabilities in general terms. It is not an offer, a specification or a warranty. Figures marked as typical are indicative; specific commitments are made only in a signed statement of work. Nothing here is engineering advice for a particular design.',
      ],
    },
    {
      title: '3. Intellectual property',
      paragraphs: [
        `Text, graphics, diagrams and code on this site belong to ${SITE.legalName} or its licensors. You may quote short extracts with attribution. Trademarks mentioned, including UCIe, PCI Express, Bluetooth and others, belong to their respective owners and are used to describe compatibility only.`,
      ],
    },
    {
      title: '4. Confidential information',
      paragraphs: [
        'Do not send confidential technical information through the contact form. Share it only after a mutual NDA is in place. We treat form submissions as business enquiries, not as confidential disclosures.',
      ],
    },
    {
      title: '5. Third-party services',
      paragraphs: [
        'The booking calendar, analytics and CRM features are provided by third parties under their own terms. Links to other websites are provided for convenience; we are not responsible for their content.',
      ],
    },
    {
      title: '6. Liability',
      paragraphs: [
        'The site is provided as is. To the extent permitted by law, we exclude liability for loss arising from use of the site or reliance on its content. Nothing in these terms limits liability that cannot be limited by law.',
      ],
    },
    {
      title: '7. Governing law',
      paragraphs: [
        'These terms are governed by the laws of [JURISDICTION: to be supplied by counsel]. Disputes are subject to the courts of [VENUE: to be supplied by counsel]. Contracts for services specify their own governing law.',
      ],
    },
    {
      title: '8. Contact',
      paragraphs: [`Questions about these terms: ${SITE.contact.email}.`],
    },
  ],
  reviewNote,
};

export const cookies: LegalDoc = {
  seo: {
    title: `Cookie Policy | ${SITE.name}`,
    description: `Every cookie and similar technology used on the ${SITE.name} website, what it does, how long it lasts and how to change your choice.`,
  },
  title: 'Cookie policy',
  updated: '[DATE: last updated, to be supplied]',
  intro: 'This page lists every cookie and similar technology this site can set. Essential items are always on. Analytics and advertising items are set only after you accept them in the cookie banner, and you can change your choice at any time with the "Cookie settings" link in the footer.',
  sections: [
    {
      title: 'Essential',
      table: {
        columns: ['Name', 'Provider', 'Purpose', 'Duration'],
        rows: [
          ['si_consent', `${SITE.name} (this site)`, 'Stores your cookie choice so the banner is not shown again', '12 months'],
          ['si_theme', `${SITE.name} (this site, local storage)`, 'Remembers the light or dark theme you chose', 'Until cleared'],
          ['__cf_bm, cf_clearance', 'Cloudflare (Turnstile), if enabled', 'Distinguishes humans from bots on the contact form', 'Up to 30 minutes'],
        ],
      },
    },
    {
      title: 'Analytics (consent required)',
      table: {
        columns: ['Name', 'Provider', 'Purpose', 'Duration'],
        rows: [
          ['_ga', 'Google Analytics 4', 'Distinguishes visitors', '2 years'],
          ['_ga_*', 'Google Analytics 4', 'Keeps session state', '2 years'],
        ],
      },
    },
    {
      title: 'Advertising measurement (consent required)',
      table: {
        columns: ['Name', 'Provider', 'Purpose', 'Duration'],
        rows: [
          ['_gcl_au', 'Google Ads', 'Stores ad click information to measure conversions', '90 days'],
          ['li_sugr, lidc, bcookie, UserMatchHistory, AnalyticsSyncHistory', 'LinkedIn Insight Tag', 'Measures conversions from LinkedIn campaigns and identifies the browser', 'From 1 day to 1 year'],
          ['hubspotutk, __hstc, __hssc, __hssrc', 'HubSpot', 'Attributes a form submission to earlier visits; set only when the HubSpot tracking script is enabled [HUBSPOT TRACKING: confirm whether enabled]', 'Up to 6 months'],
        ],
      },
    },
    {
      title: 'Third-party content loaded on request',
      paragraphs: [
        'The booking calendar on the contact page is loaded only when you open it. Once opened, the calendar provider may set its own cookies under its own policy. [CALENDAR PROVIDER: name and policy link to be supplied]',
      ],
    },
    {
      title: 'Changing your choice',
      paragraphs: [
        'Use "Cookie settings" in the footer to open the banner again. Rejecting non-essential cookies removes the analytics and advertising scripts on the next page load. You can also delete cookies in your browser settings.',
      ],
    },
  ],
  reviewNote,
};
