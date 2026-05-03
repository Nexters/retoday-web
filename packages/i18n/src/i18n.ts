import { initReactI18next } from "react-i18next";
import i18next, { type i18n as I18nInstance, type InitOptions } from "i18next";

import {
  DEFAULT_LANGUAGE,
  DEFAULT_NAMESPACE,
  type LanguageType,
  NAMESPACES,
  resources,
  SUPPORTED_LANGUAGES,
} from "./constants";

function isDevelopment(): boolean {
  const env = (globalThis as { process?: { env?: { NODE_ENV?: string } } })
    .process?.env?.NODE_ENV;
  return env !== "production";
}

export type CreateI18nOptions = {
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

export const i18n: I18nInstance = createI18n();
