"use client";

import type { PropsWithChildren } from "react";
import { I18nProvider } from "@recap/i18n";

import { useLanguage } from "@/entities/language";

const LanguageProvider = ({ children }: PropsWithChildren) => {
  const { language } = useLanguage();

  return <I18nProvider lng={language}>{children}</I18nProvider>;
};

export default LanguageProvider;
