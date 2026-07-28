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

const SERVER_TIMEZONE_TO_IANA: Record<SERVER_TIMEZONE, string> = {
  [SERVER_TIMEZONE.SEOUL]: "Asia/Seoul",
  [SERVER_TIMEZONE.UTC]: "UTC",
};

/** 서버 타임존 코드(`SEOUL` / `UTC`) → dayjs `.tz()`용 IANA 이름 */
export const toIanaTimeZone = (timeZone: string | null | undefined): string => {
  if (timeZone && timeZone in SERVER_TIMEZONE_TO_IANA) {
    return SERVER_TIMEZONE_TO_IANA[timeZone as SERVER_TIMEZONE];
  }

  return DEFAULT_TIME_ZONE;
};
