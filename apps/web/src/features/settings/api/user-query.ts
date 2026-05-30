import type { Envelope, UserProfileType } from "@recap/api";
import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
} from "@recap/react-query";

import { userAPIService } from "@/features/settings/api";
import { USER_KEYS } from "@/features/settings/api/query-keys";

type UserProfileResponse = Envelope<UserProfileType>;

type UserProfileQueryKey = ReturnType<typeof USER_KEYS.details>;

type UseGetUserProfileOptions<TData = UserProfileResponse> = Omit<
  UseQueryOptions<UserProfileResponse, Error, TData, UserProfileQueryKey>,
  "queryKey" | "queryFn" | "retry"
>;

const useGetUserProfile = <TData = UserProfileResponse>(
  options: UseGetUserProfileOptions<TData> = {},
) => {
  return useQuery<UserProfileResponse, Error, TData, UserProfileQueryKey>({
    ...options,
    queryKey: USER_KEYS.details(),
    queryFn: () => userAPIService.getUserProfile(),
    retry: false,
  });
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
