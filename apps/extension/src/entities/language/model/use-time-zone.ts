import { useEffect } from "react";
import { SERVER_TIMEZONE } from "@recap/lib";

import { browserTimeZone } from "@/entities/language/lib/browser-time-zone";
import { useGetUserProfile } from "@/features/setting/api/user-query";

const useTimeZone = () => {
  const { data } = useGetUserProfile({
    select: (data) => data?.data?.timeZone,
  });

  const timeZone = data ?? SERVER_TIMEZONE.UTC;

  useEffect(() => {
    browserTimeZone.set(timeZone);
  }, [timeZone]);

  return timeZone;
};

export default useTimeZone;
