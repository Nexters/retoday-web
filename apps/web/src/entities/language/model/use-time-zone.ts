import { DEFAULT_LANGUAGE } from "@recap/i18n";

import { useAuth } from "@/entities/auth/ui";
import { LANGUAGE_MAP } from "@/entities/language/config/language.const";
import { useLanguageStore } from "@/entities/language/model/language.store";
import { useTimeZoneContext } from "@/entities/language/ui/TimeZoneProvider";
import { useGetUserProfile } from "@/features/settings/api/user-query.client";
import { LANGUAGE_TO_PROFILE } from "@/features/settings/config/language.const";

const useTimeZone = () => {
  const { isLoggedIn } = useAuth();
  const timeZoneFromServer = useTimeZoneContext();
  const storedLanguage = useLanguageStore((s) => s.localize);

  const { data: profileLanguage } = useGetUserProfile({
    select: (data) => data?.data?.language,
    enabled: isLoggedIn,
  });

  const timeZoneFromLocal = LANGUAGE_TO_PROFILE[storedLanguage].timeZone;

  if (!isLoggedIn) {
    return timeZoneFromLocal;
  }

  if (profileLanguage) {
    const language = LANGUAGE_MAP[profileLanguage] ?? DEFAULT_LANGUAGE;
    return LANGUAGE_TO_PROFILE[language].timeZone;
  }

  return timeZoneFromServer ?? timeZoneFromLocal;
};

export default useTimeZone;
