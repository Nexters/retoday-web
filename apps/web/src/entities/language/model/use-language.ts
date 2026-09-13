"use client";

import { useCallback } from "react";
import type { LanguageType } from "@recap/i18n";

import { useLanguageStore } from "@/entities/language/model/language.store";
import { usePatchUserProfile } from "@/features/settings/api/user-query.client";
import { LANGUAGE_TO_PROFILE } from "@/features/settings/config/language.const";

const useLanguage = () => {
  const language = useLanguageStore((s) => s.localize);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  const { mutateAsync } = usePatchUserProfile();

  const patchLanguageWith = useCallback(
    async (nextLanguage?: LanguageType) => {
      const target = nextLanguage ?? useLanguageStore.getState().localize;
      await mutateAsync(LANGUAGE_TO_PROFILE[target]);
    },
    [mutateAsync],
  );

  return {
    language,
    setLanguage,
    patchLanguage: patchLanguageWith,
  };
};

export default useLanguage;
