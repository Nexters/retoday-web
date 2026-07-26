export const LocalStorageKey = {
  IsInitialized: "isInitialized",
} as const;

export type LocalStorageKey =
  (typeof LocalStorageKey)[keyof typeof LocalStorageKey];
