/**
 * Locale registry. Only `published` locales produce pages. The others are
 * declared so that hreflang output, the language switcher and the folder
 * conventions are ready the day a translation lands. See docs/I18N.md.
 */
export interface LocaleMeta {
  /** URL path segment and dictionary folder name. */
  code: string;
  /** BCP 47 tag for <html lang> and hreflang. */
  htmlLang: string;
  /** Open Graph locale. */
  ogLocale: string;
  /** Native name shown in the language switcher. */
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const LOCALES: Record<string, LocaleMeta> = {
  en: { code: 'en', htmlLang: 'en', ogLocale: 'en_US', nativeName: 'English', dir: 'ltr' },
  'zh-cn': { code: 'zh-cn', htmlLang: 'zh-Hans', ogLocale: 'zh_CN', nativeName: '简体中文', dir: 'ltr' },
  ja: { code: 'ja', htmlLang: 'ja', ogLocale: 'ja_JP', nativeName: '日本語', dir: 'ltr' },
  ko: { code: 'ko', htmlLang: 'ko', ogLocale: 'ko_KR', nativeName: '한국어', dir: 'ltr' },
};

export const DEFAULT_LOCALE = 'en';

/** Locales with a complete dictionary and content. Keep in sync with astro.config.mjs `i18n.locales`. */
export const PUBLISHED_LOCALES: string[] = ['en'];

export function isPublishedLocale(code: string | undefined): code is string {
  return !!code && PUBLISHED_LOCALES.includes(code);
}

export function localeMeta(code: string | undefined): LocaleMeta {
  return LOCALES[code ?? DEFAULT_LOCALE] ?? LOCALES[DEFAULT_LOCALE]!;
}
