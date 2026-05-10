import type { TFunction } from "i18next";
import { createInstance } from "i18next";

import {
  DEFAULT_LANGUAGE,
  type LanguageType,
  type Namespace,
  NAMESPACES,
  SUPPORTED_LANGUAGES,
} from "./constants";

type LocaleJson = Record<string, unknown>;

function namespaceToFilename(ns: string): string {
  if (ns === NAMESPACES.SETTINGS) return "setting";
  return ns;
}

function isSupportedLocale(locale: string): locale is LanguageType {
  return SUPPORTED_LANGUAGES.includes(locale as LanguageType);
}

export function mergeWithEnglishFallback(
  english: LocaleJson,
  locale: LocaleJson,
): LocaleJson {
  return { ...english, ...locale };
}

const translationCache = new Map<string, LocaleJson>();
const tCache = new Map<string, TFunction>();

const ALL_NS = Object.values(NAMESPACES) as string[];

/**
 * Load merged translations (English fallback + locale) for a namespace.
 * Server-only: uses dynamic imports under `src/locales`.
 */
export async function loadTranslations(
  _locale: string,
  _ns: string,
): Promise<LocaleJson> {
  const locale = isSupportedLocale(_locale) ? _locale : DEFAULT_LANGUAGE;
  const ns = ALL_NS.includes(_ns) ? _ns : NAMESPACES.COMMON;
  const cacheKey = `${locale}-${ns}`;

  const hit = translationCache.get(cacheKey);
  if (hit) return hit;

  const file = namespaceToFilename(ns);

  const { default: englishRaw } = await import(`./locales/en/${file}.json`);
  const english = englishRaw as LocaleJson;

  if (locale === "en") {
    translationCache.set(cacheKey, english);
    return english;
  }

  const { default: localeRaw } = await import(
    `./locales/${locale}/${file}.json`
  );
  const merged = mergeWithEnglishFallback(english, localeRaw as LocaleJson);
  translationCache.set(cacheKey, merged);
  return merged;
}

/**
 * Cached `getFixedT` for server components / Route Handlers (cal.diy-style).
 */
export async function getTranslation(
  locale: string,
  ns: Namespace,
): Promise<TFunction> {
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LANGUAGE;
  const cacheKey = `${safeLocale}-${ns}`;
  const cached = tCache.get(cacheKey);
  if (cached) return cached;

  const resources = await loadTranslations(safeLocale, ns);
  const i18n = createInstance();
  await i18n.init({
    lng: safeLocale,
    resources: {
      [safeLocale]: {
        [ns]: resources,
      },
    },
    fallbackLng: DEFAULT_LANGUAGE,
  });

  const t = i18n.getFixedT(safeLocale, ns);
  tCache.set(cacheKey, t);
  return t;
}
