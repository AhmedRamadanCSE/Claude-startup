import { SITE } from '../../site.config.ts';

export default {
  seo: {
    title: `Careers: Senior Analog, RF & Layout Engineers in Cairo | ${SITE.name}`,
    description:
      'Join a senior analog, mixed-signal and RF IC design team in Cairo, Egypt. Open roles for senior analog designers, RF IC designers and full-custom layout engineers with production tape-outs.',
  },
  hero: {
    eyebrow: 'Careers',
    title: 'We hire designers who have taped out.',
    lede: `${SITE.name} is a small team of senior engineers in ${SITE.location.city}. We work on SerDes, DDR PHY, PLL/ADPLL, Bluetooth radios and UCIe PHYs for clients in the US, Europe and Asia. If you have production silicon behind you and want to work with people who do too, read on.`,
  },
  offer: {
    title: 'What you get',
    items: [
      'Blocks that matter: PHYs, radios and clocking for products that ship',
      'A technical lead who reviews your work and expects you to review theirs',
      'Licensed, current EDA tools and advanced-node PDKs',
      'Hybrid work in Cairo; travel to client sites for kick-offs and bring-up',
      'Compensation at the top of the Cairo market, reviewed annually [DETAILS: to be supplied]',
    ],
  },
  rolesTitle: 'Open roles',
  roles: [
    {
      title: 'Senior Analog / Mixed-Signal Design Engineer (SerDes)',
      summary: 'Design TX, RX, CDR and clocking blocks for [DATA RATE: to be supplied] Gb/s transceivers. [NUMBER: to be supplied]+ years and at least two production tape-outs.',
      location: `${SITE.location.city}, hybrid`,
    },
    {
      title: 'Senior RF IC Design Engineer (Bluetooth / 2.4 GHz)',
      summary: 'Own LNA, mixer, synthesizer or PA blocks in BLE transceivers. [NUMBER: to be supplied]+ years, with a shipped radio.',
      location: `${SITE.location.city}, hybrid`,
    },
    {
      title: 'Senior Full-Custom Layout Engineer',
      summary: 'High-speed, matched and RF layout in FinFET and FD-SOI nodes. [NUMBER: to be supplied]+ years and DRC/LVS sign-off experience.',
      location: `${SITE.location.city}, hybrid`,
    },
  ],
  apply: {
    title: 'How to apply',
    body: `Send a CV and a one-paragraph description of a block you taped out, what it had to meet and what it measured, to ${SITE.contact.careersEmail}. We reply to every application within ${SITE.replyWithin}.`,
    button: 'Email your CV',
    note: 'No agencies, please. Applications are handled under our privacy policy.',
  },
} as const;
