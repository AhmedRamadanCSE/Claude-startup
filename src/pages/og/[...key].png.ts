/**
 * Build-time Open Graph images (1200x630 PNG) for every page, rendered with
 * satori + resvg from the same copy the pages use. No SVG fonts or browser needed.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getCollection } from 'astro:content';
import en from '../../i18n/en/index.ts';
import { SITE } from '../../site.config.ts';
import { stripPlaceholderNotes } from '../../lib/placeholders.ts';
import { splitEntryId } from '../../lib/format.ts';

export const prerender = true;

interface OgProps {
  [key: string]: unknown;
  kicker: string;
  title: string;
  subtitle: string;
}

export const getStaticPaths = (async () => {
  const pages: Record<string, OgProps> = {
    default: { kicker: 'Analog · Mixed-signal · RF IC design', title: SITE.tagline, subtitle: 'Senior design capacity from Cairo, Egypt. Through tape-out and silicon bring-up.' },
    home: { kicker: 'Analog · Mixed-signal · RF IC design services', title: en.home.hero.title, subtitle: 'SerDes · DDR/LPDDR PHY · PLL/ADPLL · Bluetooth/BLE · UCIe' },
    capabilities: { kicker: 'Capabilities', title: en.capabilitiesIndex.hero.title, subtitle: 'SerDes · DDR/LPDDR PHY · PLL/ADPLL · Bluetooth/BLE · UCIe · Analog & mixed-signal' },
    'engagement-models': { kicker: 'Engagement models', title: en.engagementPage.hero.title, subtitle: 'Dedicated team · Fixed-scope block · IP porting · Bring-up support' },
    'case-studies': { kicker: 'Case studies', title: en.caseStudies.hero.title, subtitle: 'Challenge · Our role · Result. Anonymized, with client approval.' },
    security: { kicker: 'Security & IP protection', title: en.security.hero.title, subtitle: 'NDA-first · Isolated environments · Licensed EDA · No reuse · Export-control screening' },
    team: { kicker: 'Team', title: 'Designers who have taped out.', subtitle: `Technical leads with ${SITE.leadExperience} of production silicon each.` },
    insights: { kicker: 'Insights', title: en.insights.hero.title, subtitle: 'Notes on SerDes, PLL/ADPLL, DDR PHY, UCIe and RF design.' },
    careers: { kicker: 'Careers', title: en.careers.hero.title, subtitle: `Senior analog, RF and layout engineers in ${SITE.location.city}.` },
    contact: { kicker: 'Contact', title: en.contact.hero.title, subtitle: `A technical lead replies within ${SITE.replyWithin}.` },
    legal: { kicker: 'Legal', title: 'Privacy, terms and cookies', subtitle: SITE.name },
  };
  for (const cap of en.capabilities) {
    pages[`capabilities-${cap.slug}`] = { kicker: 'Capability', title: cap.hero.title, subtitle: cap.short };
  }
  for (const e of await getCollection('insights', (x) => !x.data.draft)) {
    pages[`insights-${splitEntryId(e.id).slug}`] = { kicker: 'Insights', title: e.data.title, subtitle: e.data.description };
  }
  for (const e of await getCollection('caseStudies', (x) => !x.data.draft)) {
    pages[`case-studies-${splitEntryId(e.id).slug}`] = { kicker: 'Case study', title: stripPlaceholderNotes(e.data.title), subtitle: stripPlaceholderNotes(e.data.description) };
  }
  return Object.entries(pages).map(([key, props]) => ({ params: { key }, props }));
}) satisfies GetStaticPaths;

const fontDir = resolve(process.cwd(), 'src/assets/fonts/og');
let fontsPromise: Promise<{ name: string; data: ArrayBuffer; weight: 400 | 500 | 700; style: 'normal' }[]> | undefined;
function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(resolve(fontDir, 'schibsted-grotesk-latin-700-normal.woff')),
    readFile(resolve(fontDir, 'inter-latin-400-normal.woff')),
    readFile(resolve(fontDir, 'inter-latin-500-normal.woff')),
  ]).then(([heading, body, medium]) => [
    { name: 'Schibsted Grotesk', data: toArrayBuffer(heading), weight: 700 as const, style: 'normal' as const },
    { name: 'Inter', data: toArrayBuffer(body), weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: toArrayBuffer(medium), weight: 500 as const, style: 'normal' as const },
  ]);
  return fontsPromise;
}

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

function clamp(text: string, max: number): string {
  const clean = stripPlaceholderNotes(text).replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

export const GET: APIRoute = async ({ props }) => {
  const { kicker, title, subtitle } = props as OgProps;
  const fonts = await loadFonts();
  const titleText = clamp(title, 90);
  const titleSize = titleText.length > 60 ? 56 : titleText.length > 40 ? 64 : 72;

  // satori treats width/height as content-box, so padding goes on an inner flex child.
  const inner = h(
    'div',
    {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 72px',
      backgroundColor: '#0a0e13',
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      color: '#e8edf2',
      fontFamily: 'Inter',
    },
    [
      h('div', { display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, fontWeight: 500, color: '#2dd4bf', letterSpacing: 2, textTransform: 'uppercase' }, [
        h('div', { width: 14, height: 14, backgroundColor: '#2dd4bf', borderRadius: 2 }),
        h('div', {}, clamp(kicker, 60)),
      ]),
      h('div', { display: 'flex', flexDirection: 'column', gap: 24 }, [
        h('div', { fontFamily: 'Schibsted Grotesk', fontWeight: 700, fontSize: titleSize, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }, titleText),
        h('div', { fontSize: 30, lineHeight: 1.35, color: '#a9b5c2', maxWidth: 980 }, clamp(subtitle, 150)),
      ]),
      h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 24, color: '#8593a3' }, [
        h('div', { display: 'flex', alignItems: 'center', gap: 16 }, [
          h('div', { width: 36, height: 36, border: '2px solid #5f6b7a', borderRadius: 8, display: 'flex' }),
          h('div', { fontFamily: 'Schibsted Grotesk', fontWeight: 700, fontSize: 30, color: '#e8edf2' }, SITE.name),
        ]),
        h('div', {}, `${SITE.location.city}, ${SITE.location.country} · spec to silicon`),
      ]),
    ],
  );

  const tree = h('div', { width: 1200, height: 630, display: 'flex' }, [inner]);
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
