"use client";

import type { PropsWithChildren } from "react";
import { I18nProvider } from "@recap/i18n";

import { useLanguageStore } from "@/entities/language";

const LanguageProvider = ({ children }: PropsWithChildren) => {
  const language = useLanguageStore((s) => s.localize);

  return <I18nProvider lng={language}>{children}</I18nProvider>;
};

export default LanguageProvider;
