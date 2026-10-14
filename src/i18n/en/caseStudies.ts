import { SITE } from '../../site.config.ts';

export default {
  seo: {
    title: `Case Studies: Anonymized Analog & RF Design Projects | ${SITE.name}`,
    description:
      'Anonymized case studies from analog, mixed-signal and RF IC design engagements: the challenge, our role and the measured result, with nodes and specifications listed where the client has approved them.',
  },
  hero: {
    eyebrow: 'Case studies',
    title: 'Anonymized engagements, concrete outcomes',
    lede: 'Every case study follows the same structure: the challenge, our role and the result. Client names and product details are withheld. Numbers are published only with client approval and are backed by data we can show under NDA.',
  },
  template: {
    title: 'How to read these',
    items: [
      { label: 'Challenge', body: 'The specification, the node, the schedule and what made it hard.' },
      { label: 'Our role', body: 'Which engagement model, which engineers, which deliverables and how the work was reviewed.' },
      { label: 'Result', body: 'What was measured on silicon or signed off at tape-out, and what the client did next.' },
    ],
  },
  empty: 'Case studies are being prepared with client approval. [CASE STUDY: anonymized, to be supplied]',
  listLabel: 'All case studies',
  cta: {
    title: 'Want the details behind a case study?',
    body: 'Under NDA we share the specification, the verification report and, where the client allows it, the silicon data.',
  },
} as const;
