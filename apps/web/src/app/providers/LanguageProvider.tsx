"use client";

import { type PropsWithChildren, useEffect } from "react";
import { I18nProvider } from "@recap/i18n";

import { useAuth } from "@/entities/auth/ui";
import { useLanguage } from "@/entities/language";
import { LANGUAGE_MAP } from "@/entities/language/config/language.const";
import { useGetUserProfile } from "@/features/settings/api/user-query.client";

const LanguageProvider = ({ children }: PropsWithChildren) => {
  const { language, setLanguage } = useLanguage();

  const { isReady, isLoggedIn } = useAuth();

  const { data: profileLanguage } = useGetUserProfile({
    select: (data) => data?.data?.language,
    enabled: isReady && isLoggedIn,
  });

  useEffect(() => {
    if (!profileLanguage) return;

    setLanguage(LANGUAGE_MAP[profileLanguage]);
  }, [profileLanguage]);

  return <I18nProvider lng={language}>{children}</I18nProvider>;
};

export default LanguageProvider;
