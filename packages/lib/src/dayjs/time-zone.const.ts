const DEFAULT_TIME_ZONE = "UTC";

export const CURRENT_TIMEZONE =
  typeof Intl === "undefined"
    ? DEFAULT_TIME_ZONE
    : Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_TIME_ZONE;
