export {
  DEFAULT_LANGUAGE,
  DEFAULT_NAMESPACE,
  LanguageList,
  type LanguageType,
  type Namespace,
  NAMESPACES,
  type Resources,
  SUPPORTED_LANGUAGES,
} from "./constants";
export { createI18n, type CreateI18nOptions, i18n } from "./i18n";
export { I18nProvider, type I18nProviderProps } from "./I18nProvider";
export { useLocale, type UseLocaleReturn } from "./use-locale";
export type {
  TransProps,
  UseTranslationOptions,
  UseTranslationResponse,
} from "react-i18next";
export { Trans, useTranslation, withTranslation } from "react-i18next";
