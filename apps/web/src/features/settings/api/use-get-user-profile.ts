import { useQuery } from "@tanstack/react-query";

import { userAPIService } from "@/features/settings/api";

type UseUserProfileOptions = {
  enabled?: boolean;
};

export const USER_PROFILE_QUERY_KEY = ["getUserProfile"] as const;

export const useUserProfile = (options: UseUserProfileOptions = {}) => {
  const query = useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: () => userAPIService.getUserProfile(),
    enabled: options.enabled,
    retry: false,
  });

  const profile = query.data?.data ?? null;

  return {
    ...query,
    profile,
    hasProfile: Boolean(profile),
  };
};
