import { initReactI18next } from "react-i18next";
import i18next, { type i18n as I18nInstance, type InitOptions } from "i18next";

import {
  DEFAULT_LANGUAGE,
  type LanguageType,
  SUPPORTED_LANGUAGES,
} from "../config/localize.const";
import {
  DEFAULT_NAMESPACE,
  NAMESPACES,
  resources,
} from "../config/resources.const";

function isDevelopment(): boolean {
  const env = (globalThis as { process?: { env?: { NODE_ENV?: string } } })
    .process?.env?.NODE_ENV;
  return env !== "production";
}

export type CreateI18nOptions = {
  /** 초기 언어 (기본: ko) */
  lng?: LanguageType;
  overrides?: InitOptions;
};

export function createI18n(options: CreateI18nOptions = {}): I18nInstance {
  const instance = i18next.createInstance();

  instance.use(initReactI18next).init({
    resources,
    lng: options.lng ?? DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    defaultNS: DEFAULT_NAMESPACE,
    ns: Object.values(NAMESPACES),
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    missingKeyHandler: (lngs, ns, key) => {
      if (isDevelopment()) {
        console.warn(
          `[i18n missing] lng=${lngs.join(",")} ns=${ns} key=${key}`,
        );
      }
    },
    saveMissing: isDevelopment(),
    ...options.overrides,
  });

  return instance;
}

/**
 * 앱에서 공용으로 사용할 기본 인스턴스.
 */
export const i18n: I18nInstance = createI18n();
