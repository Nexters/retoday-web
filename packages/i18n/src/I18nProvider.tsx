import { type ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import type { i18n as I18nInstance } from "i18next";

import { type LanguageType } from "./constants";
import { i18n as sharedI18n } from "./i18n";

export type I18nProviderProps = {
  children: ReactNode;
  instance?: I18nInstance;
  lng?: LanguageType;
};

export function I18nProvider({ children, instance, lng }: I18nProviderProps) {
  const i18n = instance ?? sharedI18n;

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      void i18n.changeLanguage(lng);
    }

    if (lng) {
      document.documentElement.lang = lng;
      document.documentElement.dir = "ltr";
    }
  }, [i18n, lng]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
