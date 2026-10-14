import { SITE } from '../../site.config.ts';

export default {
  seo: {
    title: `Insights: Notes on SerDes, PLL, DDR PHY, UCIe and RF Design | ${SITE.name}`,
    description:
      'Technical notes from a working analog and RF design team: UCIe PHY practice, ADPLL versus analog PLL trade-offs, porting SerDes IP to new nodes, DDR PHY training and Bluetooth radio design.',
  },
  hero: {
    eyebrow: 'Insights',
    title: 'Notes from the bench and the schematic',
    lede: 'Short, specific articles on the problems we work on. Written by the engineers who do the work, for the engineers who will read it.',
  },
  listLabel: 'All articles',
  latest: 'Latest',
  byLine: (author: string) => `By ${author}`,
  cta: {
    title: 'Have a question an article did not answer?',
    body: 'Ask it on the NDA call. The engineer who wrote the article will be on it.',
  },
} as const;
