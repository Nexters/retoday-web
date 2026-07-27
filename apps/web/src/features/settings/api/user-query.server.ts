import type { Envelope, TimeZoneSchemaType, UserProfileType } from "@recap/api";
import { UserAPIService } from "@recap/api";
import { Language, SERVER_TIMEZONE } from "@recap/lib";
import {
  type FetchQueryOptions,
  type QueryClient,
  queryOptions,
} from "@tanstack/react-query";

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

const resolveTimeZoneFromProfile = (
  profile: UserProfileType | undefined,
): TimeZoneSchemaType => {
  if (profile?.timeZone) {
    return profile.timeZone;
  }

  if (profile?.language === Language.KOREAN) {
    return SERVER_TIMEZONE.SEOUL;
  }

  return SERVER_TIMEZONE.UTC;
};

export const getServerUserTimeZone = async (
  queryClient: QueryClient,
): Promise<TimeZoneSchemaType | null> => {
  await queryClient.prefetchQuery(serverUserProfileQueryOptions());

  const profile = queryClient.getQueryData<UserProfileResponse>(
    USER_KEYS.details(),
  );

  if (!profile?.data) {
    return null;
  }

  return resolveTimeZoneFromProfile(profile.data);
};
