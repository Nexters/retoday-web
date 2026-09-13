import type {
  Envelope,
  PatchUserProfileDTO,
  UserProfileType,
} from "@recap/api";
import {
  queryOptions,
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
} from "@recap/react-query";

import { userAPIService } from "@/features/setting/api";
import { USER_KEYS } from "@/features/setting/api/query-keys";

type UserProfileResponse = Envelope<UserProfileType>;

type UserProfileQueryKey = ReturnType<typeof USER_KEYS.details>;

type UseGetUserProfileOptions<TData = UserProfileResponse> = Omit<
  UseQueryOptions<UserProfileResponse, Error, TData, UserProfileQueryKey>,
  "queryKey" | "queryFn" | "retry"
>;

const userProfileQueryOptions = () =>
  queryOptions<
    UserProfileResponse,
    Error,
    UserProfileResponse,
    UserProfileQueryKey
  >({
    queryKey: USER_KEYS.details(),
    queryFn: () => userAPIService.getUserProfile(),
  });

const useGetUserProfile = <TData = UserProfileResponse>(
  options: UseGetUserProfileOptions<TData> = {},
) => {
  return useQuery<UserProfileResponse, Error, TData, UserProfileQueryKey>({
    ...(userProfileQueryOptions() as UseQueryOptions<
      UserProfileResponse,
      Error,
      TData,
      UserProfileQueryKey
    >),
    ...options,
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

const usePatchUserProfile = (
  options: UseMutationOptions<void, Error, PatchUserProfileDTO> = {},
) => {
  return useMutation<void, Error, PatchUserProfileDTO>({
    mutationFn: async (data) => {
      await userAPIService.patchUserProfile(data);
    },
    ...options,
  });
};

export {
  useDeleteExcludeDomain,
  useGetUserProfile,
  usePatchUserProfile,
  usePostExcludeDomain,
  userProfileQueryOptions,
};
