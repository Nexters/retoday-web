import { useEffect } from "react";
import type { LanguageSchemaType } from "@recap/api";
import { DEFAULT_LANGUAGE, type LanguageType } from "@recap/i18n";
import { Language } from "@recap/lib";

import { useLanguageStore } from "@/entities/language";
import { useGetUserProfile } from "@/features/setting/api/user-query";

const LANGUAGE_MAP: Record<LanguageSchemaType, LanguageType> = {
  [Language.KOREAN]: "ko",
  [Language.ENGLISH]: "en",
};
const useLanguage = () => {
  const language = useLanguageStore((s) => s.localize);
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const { data } = useGetUserProfile({
    select: (data) => data?.data?.language,
  });

  useEffect(() => {
    if (data) {
      setLanguage(LANGUAGE_MAP?.[data] ?? DEFAULT_LANGUAGE);
    }
  }, [data]);

  return { language, setLanguage };
};

export default useLanguage;
