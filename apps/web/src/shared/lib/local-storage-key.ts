export const LocalStorageKey = {
  IsInitialized: "isInitialized",
  AccessToken: "auth.accessToken",
  RefreshToken: "auth.refreshToken",
  OAuthToken: "auth.oAuthToken",
} as const;

export type LocalStorageKey =
  (typeof LocalStorageKey)[keyof typeof LocalStorageKey];
