import { SITE } from '../site.config.ts';
import { stripPlaceholderNotes } from './placeholders.ts';

type JsonLd = Record<string, unknown>;

export function absoluteUrl(path: string, site: URL | undefined): string {
  const base = site?.href ?? 'https://example.com/';
  return new URL(path, base).href;
}

export function organizationLd(site: URL | undefined): JsonLd {
  return {
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization', site),
    name: SITE.name,
    legalName: stripPlaceholderNotes(SITE.legalName),
    url: absoluteUrl('/', site),
    logo: absoluteUrl('/logo.svg', site),
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.location.city,
      addressCountry: SITE.location.countryCode,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: stripPlaceholderNotes(SITE.contact.salesEmail),
        availableLanguage: ['en'],
        areaServed: ['US', 'EU', 'GB', 'JP', 'KR', 'TW', 'SG', 'CN'],
      },
    ],
    sameAs: [stripPlaceholderNotes(SITE.contact.linkedin)],
    knowsAbout: [
      'Analog IC design',
      'Mixed-signal IC design',
      'RF IC design',
      'SerDes',
      'DDR PHY',
      'LPDDR PHY',
      'PLL',
      'ADPLL',
      'Bluetooth Low Energy',
      'UCIe',
      'IP porting',
    ],
  };
}

export function websiteLd(site: URL | undefined): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website', site),
    url: absoluteUrl('/', site),
    name: SITE.name,
    publisher: { '@id': absoluteUrl('/#organization', site) },
    inLanguage: 'en',
  };
}

export function webPageLd(site: URL | undefined, path: string, name: string, description: string): JsonLd {
  return {
    '@type': 'WebPage',
    '@id': absoluteUrl(`${path}#webpage`, site),
    url: absoluteUrl(path, site),
    name,
    description: stripPlaceholderNotes(description),
    isPartOf: { '@id': absoluteUrl('/#website', site) },
    about: { '@id': absoluteUrl('/#organization', site) },
    inLanguage: 'en',
  };
}

export function serviceLd(
  site: URL | undefined,
  opts: { path: string; name: string; description: string; serviceType: string; keywords?: readonly string[] },
): JsonLd {
  return {
    '@type': 'Service',
    '@id': absoluteUrl(`${opts.path}#service`, site),
    name: opts.name,
    serviceType: opts.serviceType,
    description: stripPlaceholderNotes(opts.description),
    provider: { '@id': absoluteUrl('/#organization', site) },
    areaServed: ['US', 'EU', 'GB', 'JP', 'KR', 'TW', 'SG', 'CN'],
    url: absoluteUrl(opts.path, site),
    ...(opts.keywords ? { keywords: opts.keywords.join(', ') } : {}),
  };
}

export function breadcrumbLd(site: URL | undefined, items: { name: string; path: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path, site),
    })),
  };
}

export function articleLd(
  site: URL | undefined,
  opts: { path: string; headline: string; description: string; datePublished: Date; dateModified?: Date; author: string; image: string },
): JsonLd {
  return {
    '@type': 'TechArticle',
    '@id': absoluteUrl(`${opts.path}#article`, site),
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished.toISOString(),
    dateModified: (opts.dateModified ?? opts.datePublished).toISOString(),
    author: { '@type': 'Person', name: stripPlaceholderNotes(opts.author), worksFor: { '@id': absoluteUrl('/#organization', site) } },
    publisher: { '@id': absoluteUrl('/#organization', site) },
    image: absoluteUrl(opts.image, site),
    mainEntityOfPage: absoluteUrl(opts.path, site),
    inLanguage: 'en',
  };
}

export function graph(items: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': items };
}
