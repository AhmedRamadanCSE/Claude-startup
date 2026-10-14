import { SITE } from '../../site.config.ts';

export interface Leader {
  name: string;
  role: string;
  years: string;
  areas: readonly string[];
  bio: string;
  photo: string;
  linkedin: string;
}

export default {
  seo: {
    title: `Team: Senior Analog & RF IC Designers | ${SITE.name}`,
    description:
      'Meet the technical leads behind our analog, mixed-signal and RF IC design services. Each lead has 15+ years designing and taping out production silicon in SerDes, DDR PHY, PLL/ADPLL and Bluetooth RF.',
  },
  hero: {
    eyebrow: 'Team',
    title: 'Designers who have taped out, leading designers who have taped out.',
    lede: `${SITE.name} is a new company built by senior engineers. Every technical lead has spent ${SITE.leadExperience} designing production silicon. We hire only designers with tape-outs behind them, and we keep the team small enough that a lead reviews every block.`,
  },
  leadersTitle: 'Technical leadership',
  leaders: [
    {
      name: '[NAME: to be supplied]',
      role: 'Technical lead, SerDes and high-speed I/O',
      years: '[NUMBER: to be supplied] years',
      areas: ['High-speed SerDes', 'UCIe die-to-die PHY', 'CDR and clocking'],
      bio: '[BIO: to be supplied. Suggested content: nodes and foundries worked in, protocols and data rates taped out, previous employers if they may be named, education.]',
      photo: '[PHOTO: to be supplied]',
      linkedin: '[LINKEDIN URL: to be supplied]',
    },
    {
      name: '[NAME: to be supplied]',
      role: 'Technical lead, PLL/ADPLL and DDR PHY',
      years: '[NUMBER: to be supplied] years',
      areas: ['PLL and ADPLL', 'DDR / LPDDR PHY', 'Clock distribution'],
      bio: '[BIO: to be supplied. Suggested content: PLL architectures and jitter figures achieved, DDR generations taped out, nodes and foundries, previous employers if they may be named.]',
      photo: '[PHOTO: to be supplied]',
      linkedin: '[LINKEDIN URL: to be supplied]',
    },
    {
      name: '[NAME: to be supplied]',
      role: 'Technical lead, RF and Bluetooth',
      years: '[NUMBER: to be supplied] years',
      areas: ['Bluetooth / BLE RF transceivers', 'RF synthesizers', 'Sensor front-ends'],
      bio: '[BIO: to be supplied. Suggested content: radios taped out and shipped, sensitivity and current figures achieved, nodes, previous employers if they may be named.]',
      photo: '[PHOTO: to be supplied]',
      linkedin: '[LINKEDIN URL: to be supplied]',
    },
  ] satisfies readonly Leader[],
  stats: {
    title: 'The team in numbers',
    items: [
      { label: 'Engineers', value: '[NUMBER: to be supplied]' },
      { label: 'Senior designers (10+ years)', value: '[NUMBER: to be supplied]' },
      { label: 'Layout engineers', value: '[NUMBER: to be supplied]' },
      { label: 'Tape-outs across the team', value: '[NUMBER: to be supplied]' },
    ],
    note: 'Headcount and experience figures are updated quarterly. Individual CVs are shared under NDA.',
  },
  principles: {
    title: 'How we run the team',
    items: [
      { title: 'Leads review every block', body: 'A technical lead signs off every architecture, schematic and layout review. Nothing goes to tape-out on one pair of eyes.' },
      { title: 'Small, stable teams', body: 'Engineers stay on one client at a time. You get continuity, and your context stays with the people who learned it.' },
      { title: 'Written over verbal', body: 'Specifications, reviews and weekly status are written documents you can search later. Calls confirm; documents decide.' },
      { title: 'Only designers with tape-outs', body: 'We do not hire from training programs. Every designer joins with production silicon behind them and is paired with a lead for the first project.' },
    ],
  },
  location: {
    title: `Based in ${SITE.location.city}`,
    body: `${SITE.location.city} runs on ${SITE.location.timezoneLabel}. ${SITE.overlap.europe} ${SITE.overlap.us} ${SITE.overlap.asia} Engineers travel for kick-offs, tape-out reviews and bring-up where you need them on site.`,
  },
  cta: {
    title: 'Meet the lead for your block',
    body: 'Every NDA call includes the technical lead for your area, not an account manager.',
  },
} as const;
