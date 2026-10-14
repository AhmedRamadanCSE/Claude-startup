export function formatDate(date: Date, locale = 'en'): string {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

/** "en/slug" -> { locale: "en", slug: "slug" } */
export function splitEntryId(id: string): { locale: string; slug: string } {
  const [locale, ...rest] = id.split('/');
  return { locale: locale ?? 'en', slug: rest.join('/') };
}
