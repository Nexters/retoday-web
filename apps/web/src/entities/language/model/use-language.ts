import type { LanguageType } from "@recap/i18n";
import { DEFAULT_LANGUAGE } from "@recap/i18n";

import { useAuth } from "@/entities/auth/ui";
import { LANGUAGE_MAP } from "@/entities/language/config/language.const";
import { useLanguageStore } from "@/entities/language/model/language.store";
import { useGetUserProfile } from "@/features/settings/api/user-query.client";

const useLanguage = () => {
  const storedLanguage = useLanguageStore((s) => s.localize);
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const { isLoggedIn } = useAuth();
  const { data: profileLanguage } = useGetUserProfile({
    select: (data) => data?.data?.language,
    enabled: isLoggedIn,
  });

  const language: LanguageType = profileLanguage
    ? (LANGUAGE_MAP[profileLanguage] ?? DEFAULT_LANGUAGE)
    : storedLanguage;

  return { language, setLanguage };
};

export default useLanguage;
