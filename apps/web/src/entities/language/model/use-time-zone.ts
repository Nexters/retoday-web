import { useMemo } from "react";

import { useAuth } from "@/entities/auth/ui";
import { useLanguageStore } from "@/entities/language/model/language.store";
import { useTimeZoneContext } from "@/entities/language/ui/TimeZoneProvider";
import { useGetUserProfile } from "@/features/settings/api/user-query.client";
import { LANGUAGE_TO_PROFILE } from "@/features/settings/config/language.const";

const useTimeZone = () => {
  const { isLoggedIn } = useAuth();
  const timeZoneFromServer = useTimeZoneContext();
  const language = useLanguageStore((s) => s.localize);

  const { data: timeZoneFromProfile } = useGetUserProfile({
    select: (data) => data?.data?.timeZone,
    enabled: isLoggedIn,
  });

  const timeZoneFromLocal = useMemo(
    () => LANGUAGE_TO_PROFILE[language].timeZone,
    [language],
  );

  if (isLoggedIn) {
    return timeZoneFromProfile ?? timeZoneFromServer ?? timeZoneFromLocal;
  }

  return timeZoneFromLocal;
};

export default useTimeZone;
