import {
  useMutation,
  type UseMutationOptions,
  useQuery,
} from "@recap/react-query";

import { userAPIService } from "@/entities/user/api";
import type { UserProfileResponse } from "@/entities/user/model/user.type";
import { USER_KEYS } from "@/entities/user/queries/query-key.const";

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
