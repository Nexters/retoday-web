import { useTranslation } from "react-i18next";
import type { i18n as I18nInstance, TFunction } from "i18next";

import {
  DEFAULT_LANGUAGE,
  DEFAULT_NAMESPACE,
  type LanguageType,
  type Namespace,
} from "./constants";

export type UseLocaleReturn = {
  i18n: I18nInstance;
  t: TFunction;
  isLocaleReady: boolean;
  locale: LanguageType;
};

export function useLocale(
  namespace: Namespace = DEFAULT_NAMESPACE,
): UseLocaleReturn {
  const { i18n, t, ready } = useTranslation(namespace);

  const locale = (i18n.resolvedLanguage ??
    i18n.language ??
    DEFAULT_LANGUAGE) as LanguageType;

  const isLocaleReady = Boolean(
    ready &&
    i18n.isInitialized &&
    Object.keys(i18n.store?.data ?? {}).length > 0,
  );

  return {
    i18n,
    t,
    isLocaleReady,
    locale,
  };
}
