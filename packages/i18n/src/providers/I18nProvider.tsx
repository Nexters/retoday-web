"use client";

import { type ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import type { i18n as I18nInstance } from "i18next";

import { createI18n, type CreateI18nOptions } from "../core/i18n";

type I18nProviderProps = {
  children: ReactNode;
  instance?: I18nInstance;
  lng?: CreateI18nOptions["lng"];
  options?: CreateI18nOptions["overrides"];
};

/**
 * 앱 전역에 i18next 인스턴스를 주입하는 클라이언트 Provider
 */
function I18nProvider({ children, instance, lng, options }: I18nProviderProps) {
  const [i18n] = useState<I18nInstance>(
    () => instance ?? createI18n({ lng, overrides: options }),
  );

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      void i18n.changeLanguage(lng);
    }
  }, [i18n, lng]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export { I18nProvider };
export type { I18nProviderProps };
