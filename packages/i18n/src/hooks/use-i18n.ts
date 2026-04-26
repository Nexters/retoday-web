"use client";

import { useCallback } from "react";
import {
  useTranslation,
  type UseTranslationOptions,
  type UseTranslationResponse,
} from "react-i18next";

import {
  DEFAULT_LANGUAGE,
  type LanguageType,
  SUPPORTED_LANGUAGES,
} from "../config/localize.const";
import type { Namespace } from "../config/resources.const";

export type UseI18nReturn<Ns extends Namespace | Namespace[] | undefined> = {
  t: UseTranslationResponse<
    Ns extends Namespace[] ? Ns[number] : Extract<Ns, Namespace>,
    undefined
  >["t"];
  locale: LanguageType;
  changeLanguage: (next: LanguageType) => Promise<unknown>;
  languages: readonly LanguageType[];
};

/**
 * 앱 공용 i18n 훅.
 */
function useI18n<Ns extends Namespace | Namespace[] | undefined = undefined>(
  ns?: Ns,
  options?: UseTranslationOptions<undefined>,
): UseI18nReturn<Ns> {
  const { t, i18n } = useTranslation(ns as Namespace | Namespace[], options);

  const changeLanguage = useCallback(
    (next: LanguageType) => i18n.changeLanguage(next),
    [i18n],
  );

  const locale = (i18n.resolvedLanguage ?? DEFAULT_LANGUAGE) as LanguageType;

  return {
    t: t as UseI18nReturn<Ns>["t"],
    locale,
    changeLanguage,
    languages: SUPPORTED_LANGUAGES,
  };
}

export { useI18n };
