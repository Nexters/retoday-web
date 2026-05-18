import type { Envelope } from "@recap/api";
import { useQuery } from "@recap/react-query";

import { userAPIService } from "@/features/settings/api";
import { USER_KEYS } from "@/features/settings/api/query-key.const";
import type { UserProfileType } from "@/features/settings/model/get-user-profile.schema";

type UserProfileResponse = Envelope<UserProfileType>;

type UseGetUserProfileOptions = {
  enabled?: boolean;
};

export const useGetUserProfile = (options: UseGetUserProfileOptions = {}) => {
  const query = useQuery<UserProfileResponse>({
    queryKey: USER_KEYS.details(),
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
