import { SERVER_TIMEZONE } from "@recap/lib";

import { useGetUserProfile } from "@/features/settings/api/user-query.client";

const useTimeZone = () => {
  const { data } = useGetUserProfile({
    select: (data) => data?.data?.timeZone,
  });

  return data ?? SERVER_TIMEZONE.UTC;
};

export default useTimeZone;
