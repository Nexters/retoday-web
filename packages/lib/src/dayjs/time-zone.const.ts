const DEFAULT_TIME_ZONE = "UTC";

export const CURRENT_TIMEZONE =
  typeof Intl === "undefined"
    ? DEFAULT_TIME_ZONE
    : Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_TIME_ZONE;

export enum SERVER_TIMEZONE {
  SEOUL = "SEOUL",
  UTC = "UTC",
}

export const SERVER_CURRENT_TIMEZONE =
  CURRENT_TIMEZONE === "Asia/Seoul"
    ? SERVER_TIMEZONE.SEOUL
    : SERVER_TIMEZONE.UTC;
