import type { Envelope, UserProfileType } from "@recap/api";
import {
  useMutation,
  type UseMutationOptions,
  useQuery,
} from "@recap/react-query";

import { userAPIService } from "@/features/setting/api";
import { USER_KEYS } from "@/features/setting/api/query-keys";

type UserProfileEnvelope = Envelope<UserProfileType>;

const useGetUserProfile = () => {
  const query = useQuery<UserProfileEnvelope>({
    queryKey: USER_KEYS.details(),
    queryFn: () => userAPIService.getUserProfile(),
  });

  const profile = query.data?.data ?? null;

  return {
    ...query,
    /** Unwrapped profile for existing UI expecting flat user fields */
    data: profile,
    profile,
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
