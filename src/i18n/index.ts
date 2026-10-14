import en from './en/index.ts';
import { DEFAULT_LOCALE, PUBLISHED_LOCALES } from './config.ts';

export type Dictionary = typeof en;

type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

/**
 * Register translated dictionaries here. A translation may be partial: any
 * missing key falls back to English so a half-translated locale never
 * renders an empty string.
 *
 *   import ja from './ja/index.ts';
 *   const translations = { ja } satisfies Record<string, DeepPartial<Dictionary>>;
 */
const translations: Record<string, DeepPartial<Dictionary>> = {};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: DeepPartial<T> | undefined): T {
  if (override === undefined) return base;
  if (Array.isArray(base)) return (override as unknown as T) ?? base;
  if (isPlainObject(base) && isPlainObject(override)) {
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(override)) {
      const o = (override as Record<string, unknown>)[key];
      const b = (base as Record<string, unknown>)[key];
      out[key] = o === undefined ? b : deepMerge(b, o as never);
    }
    return out as T;
  }
  return (override as unknown as T) ?? base;
}

const cache = new Map<string, Dictionary>();

export function getDictionary(locale: string | undefined): Dictionary {
  const code = locale && PUBLISHED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  if (code === DEFAULT_LOCALE) return en;
  const cached = cache.get(code);
  if (cached) return cached;
  const merged = deepMerge(en, translations[code]);
  cache.set(code, merged);
  return merged;
}

/** Prefix a site-relative path with the locale segment when it is not the default locale. */
export function localizePath(path: string, locale: string | undefined = DEFAULT_LOCALE): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (!locale || locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean === '/' ? '/' : clean}`;
}

/** Resolve the locale from a URL pathname (first segment) with a default-locale fallback. */
export function localeFromPath(pathname: string): string {
  const first = pathname.split('/').filter(Boolean)[0];
  return first && PUBLISHED_LOCALES.includes(first) ? first : DEFAULT_LOCALE;
}

/** Strip the locale prefix so content lookups use a locale-neutral path. */
export function stripLocale(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] && PUBLISHED_LOCALES.includes(parts[0]) && parts[0] !== DEFAULT_LOCALE) {
    parts.shift();
  }
  return `/${parts.join('/')}${parts.length ? '/' : ''}`;
}
