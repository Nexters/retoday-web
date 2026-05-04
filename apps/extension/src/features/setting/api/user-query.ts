import {
  useMutation,
  type UseMutationOptions,
  useQuery,
} from "@recap/react-query";

import { userAPIService } from "@/features/setting/api";
import { USER_KEYS } from "@/features/setting/api/query-key.const";
import type { UserProfileResponse } from "@/features/setting/model/user.type";

const useGetUserProfile = () => {
  return useQuery<UserProfileResponse>({
    queryKey: USER_KEYS.detail(["user-profile"]),
    queryFn: async () => {
      const response = await userAPIService.getUserProfile();
      return response as UserProfileResponse;
    },
  });
};

const usePostExcludeDomain = (
  options: UseMutationOptions<void, Error, { domain: string }>,
) => {
  return useMutation<void, Error, { domain: string }>({
    mutationFn: async (data) => {
      await userAPIService.postExcludeDomain(data);
    },
    ...options,
  });
};

const useDeleteExcludeDomain = (
  options: UseMutationOptions<void, Error, { domain: string }>,
) => {
  return useMutation<void, Error, { domain: string }>({
    mutationFn: async (data) => {
      await userAPIService.deleteExcludeDomain(data);
    },
    ...options,
  });
};
export { useDeleteExcludeDomain, useGetUserProfile, usePostExcludeDomain };
