import type { Envelope, UserProfileType } from "@recap/api";
import {
  useMutation,
  type UseMutationOptions,
  useQuery,
} from "@recap/react-query";

import { userAPIService } from "@/features/settings/api";
import { USER_KEYS } from "@/features/settings/api/query-keys";

type UserProfileResponse = Envelope<UserProfileType>;

type UseGetUserProfileOptions = {
  enabled?: boolean;
};

const useGetUserProfile = (options: UseGetUserProfileOptions = {}) => {
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

const usePostExcludeDomain = (
  options: UseMutationOptions<void, Error, { domain: string }>,
) => {
  return useMutation<void, Error, { domain: string }>({
    mutationFn: async (data) => {
      await userAPIService.addExcludedDomain(data);
    },
    ...options,
  });
};

const useDeleteExcludeDomain = (
  options: UseMutationOptions<void, Error, { domain: string }>,
) => {
  return useMutation<void, Error, { domain: string }>({
    mutationFn: async (data) => {
      await userAPIService.deleteExcludedDomain(data);
    },
    ...options,
  });
};

export { useDeleteExcludeDomain, useGetUserProfile, usePostExcludeDomain };
