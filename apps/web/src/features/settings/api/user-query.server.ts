import type { Envelope, UserProfileType } from "@recap/api";
import { UserAPIService } from "@recap/api";
import { type FetchQueryOptions, queryOptions } from "@tanstack/react-query";

import { createServerAuthedRestAPI } from "@/entities/auth/lib/create-server-authed-rest";

import { USER_KEYS } from "./query-keys";

type UserProfileResponse = Envelope<UserProfileType>;
type UserProfileQueryKey = ReturnType<typeof USER_KEYS.details>;

const serverUserAPIService = new UserAPIService(
  createServerAuthedRestAPI(undefined, { apiBaseURL: "v1" }),
);

export const serverUserProfileQueryOptions = (): FetchQueryOptions<
  UserProfileResponse,
  Error,
  UserProfileResponse,
  UserProfileQueryKey
> =>
  queryOptions<
    UserProfileResponse,
    Error,
    UserProfileResponse,
    UserProfileQueryKey
  >({
    queryKey: USER_KEYS.details(),
    queryFn: () => serverUserAPIService.getUserProfile(),
    retry: false,
  });
