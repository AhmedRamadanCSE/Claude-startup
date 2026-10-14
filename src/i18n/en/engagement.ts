import { SITE } from '../../site.config.ts';

export interface EngagementModel {
  id: string;
  name: string;
  short: string;
  suits: readonly string[];
  timeline: string;
  deliver: readonly string[];
  pricing: string;
  example: string;
}

export const engagementModels: readonly EngagementModel[] = [
  {
    id: 'dedicated-team',
    name: 'Dedicated design team',
    short: 'Named senior engineers embedded in your program, on your flow or ours, for six months or longer.',
    suits: [
      'Programs that need [NUMBER: to be supplied] or more senior analog, RF or layout engineers for six months or longer',
      'Teams with an established flow and PDK who want capacity, not a different process',
      'Companies that would otherwise open a requisition and wait',
    ],
    timeline: 'First engineers start [NUMBER: to be supplied] weeks after NDA and scoping. Ramp to full team over [NUMBER: to be supplied] weeks.',
    deliver: [
      'Named engineers with published CVs, not a pool',
      'Your flow, PDK and environment, or our isolated environment',
      'A technical lead as single point of contact',
      'Weekly written status, monthly steering review',
      'Backfill guarantee: a departing engineer is replaced with a hand-over period',
    ],
    pricing: 'Monthly rate per engineer by seniority. Minimum term [NUMBER: to be supplied] months. Scoped after NDA.',
    example: 'Example: two senior SerDes designers and one layout engineer embedded for a [NODE: to be supplied] transceiver program.',
  },
  {
    id: 'fixed-scope-block',
    name: 'Fixed-scope block delivery',
    short: 'A defined block for a defined node, delivered to a signed-off specification with milestone acceptance.',
    suits: [
      'A PLL, LDO, ADC, SerDes lane, PHY or radio with a written specification, or one we can write with you',
      'Programs that want a fixed price and fixed milestones',
      'Teams without the bandwidth to supervise day to day',
    ],
    timeline: 'Typical durations: PLL [NUMBER: to be supplied] weeks; SerDes lane [NUMBER: to be supplied] weeks; DDR PHY [NUMBER: to be supplied] weeks; BLE transceiver [NUMBER: to be supplied] weeks. Confirmed at scoping.',
    deliver: [
      'Specification sign-off with acceptance criteria',
      'Architecture review, schematic review, layout review and final review as milestones',
      'GDS, models, LEF/LIB and the verification report',
      'Characterization plan and tape-out support',
      'Bring-up support after first silicon',
    ],
    pricing: 'Fixed price per milestone, invoiced on acceptance. Change requests priced separately. Scoped after NDA.',
    example: 'Example: a fractional-N PLL at [NODE: to be supplied] with [NUMBER: to be supplied] fs integrated jitter, delivered in [NUMBER: to be supplied] weeks across four milestones.',
  },
  {
    id: 'ip-porting',
    name: 'IP porting and migration',
    short: 'Move an existing block or IP to a new process node, foundry or metal stack without losing a quarter.',
    suits: [
      'Proven IP on [NODE: to be supplied] that must ship on [NODE: to be supplied]',
      'Foundry or metal-stack changes that invalidate the original layout',
      'Blocks whose original designers are no longer available',
    ],
    timeline: 'Gap analysis in [NUMBER: to be supplied] weeks. Port and re-verification typically [NUMBER: to be supplied] weeks for a PLL or LDO, [NUMBER: to be supplied] weeks for a SerDes lane. Confirmed at scoping.',
    deliver: [
      'Gap analysis: device, metal, supply, ESD and reliability deltas between nodes',
      'Re-architected clocking, ESD and bias where the node requires it',
      'Re-simulated budget and re-layout of critical paths',
      'Delta report comparing old and new node results',
      'Updated models, LEF/LIB and documentation',
    ],
    pricing: 'Fixed price after gap analysis, or time and materials for exploratory ports. Scoped after NDA.',
    example: 'Example: a [DATA RATE: to be supplied] Gb/s SerDes ported from [NODE: to be supplied] to [NODE: to be supplied] with the clocking re-planned for the new supply.',
  },
  {
    id: 'bring-up',
    name: 'Silicon bring-up and characterization support',
    short: 'Bench plans, scripts, measurements and debug for first silicon, on site or remote.',
    suits: [
      'Teams with first silicon back and a characterization backlog',
      'Blocks that do not meet specification on the bench and need root cause',
      'Programs that need a characterization report for a customer or a qualification',
    ],
    timeline: 'Engineers available from [NUMBER: to be supplied] business days after request. Typical engagement [NUMBER: to be supplied] weeks.',
    deliver: [
      'Bench plan mapped to the specification and the verification report',
      'Automation scripts for instruments and test boards',
      'Characterization report across voltage and temperature',
      'Silicon-to-simulation correlation and root-cause analysis',
      'Recommendations for the next revision',
    ],
    pricing: 'Day rate or fixed price per characterization report. Travel at cost. Scoped after NDA.',
    example: 'Example: characterization of a [NODE: to be supplied] PLL across [NUMBER: to be supplied] parts and [NUMBER: to be supplied] temperatures with a correlation report.',
  },
];

export const engagementPage = {
  seo: {
    title: `Engagement Models: Dedicated Team, Fixed-Scope, IP Porting, Bring-Up | ${SITE.name}`,
    description:
      'Four ways to work with an analog and RF design team: dedicated design team, fixed-scope block delivery, IP porting to a new process node, and silicon bring-up and characterization support. Pricing scoped after NDA.',
  },
  hero: {
    eyebrow: 'Engagement models',
    title: 'Four ways to add senior analog capacity',
    lede: 'Pick the model that matches how your program is run. Each one uses the same engineers, the same reviews and the same IP-protection rules.',
  },
  labels: {
    suits: 'Who it suits',
    timeline: 'Timeline',
    deliver: 'What we deliver',
    pricing: 'How pricing works',
    example: 'Example',
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Scoped after NDA. No surprises later.',
    body: 'We do not publish rates. Every engagement is scoped after the NDA, when we know the block, the node, the schedule and the flow. What you can expect:',
    items: [
      'A written proposal with scope, milestones, acceptance criteria and price within [NUMBER: to be supplied] business days of the scoping call.',
      'Fixed-price work invoiced on milestone acceptance; team work invoiced monthly.',
      'All deliverables assigned to you on payment. Our background IP, where used, is licensed to you without restriction for the delivered block.',
      'Change requests priced before work starts, never after.',
      'Senior rates well below US and EU design houses. [NUMBER: indicative rate comparison to be supplied].',
    ],
  },
  compare: {
    title: 'At a glance',
    columns: ['Model', 'Best for', 'Starts in', 'Commercial'],
    rows: [
      ['Dedicated design team', 'Capacity for 6+ months', '[NUMBER: to be supplied] weeks', 'Monthly per engineer'],
      ['Fixed-scope block delivery', 'A defined block for a node', '[NUMBER: to be supplied] weeks', 'Fixed price per milestone'],
      ['IP porting and migration', 'Existing IP on a new node', '[NUMBER: to be supplied] weeks', 'Fixed after gap analysis'],
      ['Bring-up and characterization', 'First silicon on the bench', '[NUMBER: to be supplied] days', 'Day rate or per report'],
    ],
  },
  cta: {
    title: 'Not sure which model fits?',
    body: 'Describe the program in a few lines. We will propose a model on the call and tell you if we are not the right fit.',
  },
} as const;
