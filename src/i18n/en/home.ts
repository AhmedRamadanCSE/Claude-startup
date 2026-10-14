import { SITE } from '../../site.config.ts';

export default {
  seo: {
    title: `Analog, Mixed-Signal & RF IC Design Services | ${SITE.name}`,
    description:
      'Senior analog, mixed-signal and RF IC design services: high-speed SerDes, DDR/LPDDR PHY, PLL and ADPLL, Bluetooth/BLE RF transceivers and UCIe die-to-die PHYs, from specification through tape-out and silicon bring-up.',
  },

  hero: {
    eyebrow: 'Analog, mixed-signal and RF IC design services',
    title: 'Senior analog design capacity, from specification to silicon.',
    lede: `High-speed SerDes, DDR/LPDDR PHY, PLL and ADPLL, Bluetooth/BLE RF transceivers and UCIe die-to-die interfaces. Designed by engineers with ${SITE.leadExperience} of production tape-outs each. Delivered through tape-out and silicon bring-up.`,
    primaryCta: 'Request an NDA call',
    secondaryCta: 'See our capabilities',
    figureCaption: 'Illustrative NRZ eye diagram. Measured and simulated results for a specific block are shared under NDA.',
    facts: [
      { label: 'Technical leads', value: `${SITE.leadExperience} each` },
      { label: 'Based in', value: `${SITE.location.city}, ${SITE.location.country}` },
      { label: 'Working overlap', value: 'EU full day · US morning · Asia afternoon' },
    ],
  },

  proof: {
    title: 'Where our engineers have worked',
    items: [
      { label: 'Process nodes', value: '[NODES: to be supplied, e.g. 28 nm, 22 nm FD-SOI, 16/12 nm FinFET, 7 nm, 5 nm]' },
      { label: 'Foundries', value: '[FOUNDRIES: to be supplied, e.g. TSMC, Samsung Foundry, GlobalFoundries]' },
      { label: 'Tape-outs led by our engineers', value: '[NUMBER: to be supplied]' },
      { label: 'EDA flows', value: '[EDA TOOLS: licensed tools to be supplied, e.g. Cadence Virtuoso/Spectre, Synopsys PrimeSim, Siemens Calibre]' },
    ],
    note: 'All work is under NDA. Node and foundry details for a specific block are shared after the NDA is signed.',
  },

  capabilities: {
    eyebrow: 'Capabilities',
    title: 'Blocks we design and deliver',
    lede: 'Five areas where our leads have taped out production silicon, plus the analog and mixed-signal blocks that surround them. Every figure below is a specification we substantiate with data under NDA.',
    cta: 'All capabilities',
  },

  process: {
    eyebrow: 'How we work',
    title: 'Four steps. No surprises at tape-out.',
    lede: 'The same process on every engagement, whether you take one block or a dedicated team.',
    steps: [
      {
        title: 'NDA and scoping',
        body: 'A mutual NDA comes first. Then a scoping call with the engineers who will do the work, not a sales team. You receive a written scope, a resourcing plan and a risk list within [NUMBER: to be supplied] business days.',
      },
      {
        title: 'Architecture and specification sign-off',
        body: 'We write or review the block specification and run architecture-level models. Corners, supplies, interfaces, test modes and acceptance criteria are agreed in writing before the first schematic.',
      },
      {
        title: 'Design and verification with weekly reviews',
        body: 'Schematic, layout and verification proceed in your environment or in our isolated one. Every week you get a written status: milestones, open issues, corner results and risks. Reviews are held with your engineers, not about them.',
      },
      {
        title: 'Tape-out and bring-up support',
        body: 'We support DRC/LVS sign-off, final checks and the tape-out review. When first silicon returns, we work the bench plan, characterization and debug with you until the block meets its specification.',
      },
    ],
  },

  why: {
    eyebrow: 'Why teams work with us',
    title: 'Senior people. Predictable delivery.',
    items: [
      {
        title: 'Engineers who have shipped silicon',
        body: `Our technical leads have each spent ${SITE.leadExperience} designing and taping out production ICs. The people on the scoping call are the people who design your block.`,
      },
      {
        title: 'Working hours that overlap with yours',
        body: `${SITE.overlap.europe} ${SITE.overlap.us} ${SITE.overlap.asia}`,
      },
      {
        title: 'Cairo cost structure, design-house review culture',
        body: 'Senior rates are well below those of US and EU design houses. [NUMBER: indicative rate comparison to be supplied]. Rates and terms are scoped after NDA.',
      },
      {
        title: 'Strict IP protection',
        body: 'NDA before any technical detail. Isolated per-client environments. Licensed EDA tools only. Nothing from one client is reused for another.',
      },
    ],
  },

  engagement: {
    eyebrow: 'Engagement models',
    title: 'Four ways to add capacity',
    cta: 'Compare engagement models',
  },

  caseStudies: {
    eyebrow: 'Case studies',
    title: 'Anonymized work, concrete numbers',
    lede: 'Client names and product details stay confidential. Specifications, nodes and outcomes are listed where the client has approved them.',
    cta: 'All case studies',
  },

  security: {
    eyebrow: 'Security and IP protection',
    title: 'Your IP stays yours',
    items: [
      'Mutual NDA before any technical discussion.',
      'Isolated design environment per client, with access limited to named engineers.',
      'Licensed EDA tools only, on audited infrastructure.',
      'No reuse of client IP, schematics, layouts or scripts across projects.',
      'Export-control screening of every customer and engagement.',
      'Data handed back and deleted at project end, with written confirmation.',
    ],
    cta: 'Read our security practices',
  },

  finalCta: {
    title: 'Add senior analog capacity to your next tape-out.',
    body: `Book a 30-minute NDA call with a technical lead. We reply within ${SITE.replyWithin}.`,
    primaryCta: 'Request an NDA call',
    secondaryCta: 'Engagement models',
  },
} as const;
