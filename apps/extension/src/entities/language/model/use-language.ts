import { useCallback } from "react";
import type { LanguageType } from "@recap/i18n";

import { useLanguageStore } from "@/entities/language";
import { browserTimeZone } from "@/entities/language/lib/browser-time-zone";
import { usePatchUserProfile } from "@/features/setting/api/user-query";
import { LANGUAGE_TO_PROFILE } from "@/features/setting/config/language.const";

const useLanguage = () => {
  const language = useLanguageStore((s) => s.localize);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  const { mutateAsync } = usePatchUserProfile();

  const patchLanguage = useCallback(
    async (nextLanguage?: LanguageType) => {
      const target = nextLanguage ?? useLanguageStore.getState().localize;
      const profile = LANGUAGE_TO_PROFILE[target];

      await mutateAsync(profile);
      await browserTimeZone.set(profile.timeZone);
    },
    [mutateAsync],
  );

  return {
    language,
    setLanguage,
    patchLanguage,
  };
};

export default useLanguage;
