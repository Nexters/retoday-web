import { dayjs } from "./dayjs";

type DateInput = Date | string | number | null | undefined;

export type AppLocale = "ko-KR" | "ja-JP" | "en-US";

export interface DateFormatterOptions {
  locale?: string;
  timeZone?: string;
  timeFormat?: 12 | 24;
}

const DEFAULT_LOCALE: AppLocale = "en-US";
const DEFAULT_TIME_ZONE = "UTC";

export const getBrowserLocale = () => {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  return navigator.language || DEFAULT_LOCALE;
};

export const getBrowserTimeZone = () => {
  if (typeof Intl === "undefined") return DEFAULT_TIME_ZONE;
  return Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_TIME_ZONE;
};

export const normalizeLocale = (locale?: string): AppLocale => {
  if (!locale) return DEFAULT_LOCALE;

  const lower = locale.toLowerCase();

  if (lower.startsWith("ko")) return "ko-KR";
  if (lower.startsWith("ja")) return "ja-JP";
  return "en-US";
};

export const toDayjsLocale = (locale?: string): "ko" | "ja" | "en" => {
  const normalized = normalizeLocale(locale);

  if (normalized === "ko-KR") return "ko";
  if (normalized === "ja-JP") return "ja";
  return "en";
};

const resolveOptions = (options: DateFormatterOptions = {}) => {
  return {
    locale: normalizeLocale(options.locale ?? getBrowserLocale()),
    timeZone: options.timeZone ?? getBrowserTimeZone(),
    timeFormat: options.timeFormat ?? 24,
  };
};

/**
 * 지역별 날짜/시간 포맷.
 *
 * ko-KR + Asia/Seoul       → 2026. 5. 3. 오전 9:30
 * ja-JP + Asia/Tokyo       → 2026/05/03 9:30
 * en-US + America/New_York → May 2, 2026, 8:30 PM
 */
export const formatLocalizedDateTime = (
  date: DateInput,
  options: DateFormatterOptions & {
    dateStyle?: Intl.DateTimeFormatOptions["dateStyle"];
    timeStyle?: Intl.DateTimeFormatOptions["timeStyle"];
    hour12?: boolean;
  } = {},
): string => {
  if (!date) return "";

  const { locale, timeZone } = resolveOptions(options);
  const target = new Date(date);

  if (Number.isNaN(target.getTime())) return "";

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    dateStyle: options.dateStyle ?? "medium",
    timeStyle: options.timeStyle ?? "short",
    ...(options.hour12 !== undefined ? { hour12: options.hour12 } : {}),
  }).format(target);
};

export const formatDate = (
  date: DateInput,
  format = "YYYY-MM-DD",
  options: DateFormatterOptions = {},
): string => {
  if (!date) return "";

  const { locale, timeZone } = resolveOptions(options);

  const target = dayjs(date).tz(timeZone);

  if (!target.isValid()) return "";

  return target.locale(toDayjsLocale(locale)).format(format);
};

export const formatTime = (
  date: DateInput,
  options: DateFormatterOptions = {},
): string => {
  if (!date) return "";

  const { timeZone, timeFormat } = resolveOptions(options);

  const target = dayjs(date).tz(timeZone);

  if (!target.isValid()) return "";

  return target.format(timeFormat === 12 ? "h:mma" : "HH:mm");
};

export const formatDuration = (
  seconds: number,
  t: (key: string, options?: Record<string, unknown>) => string,
): string => {
  if (seconds <= 0 || Number.isNaN(seconds)) {
    return t("common:duration.second", { count: 0 });
  }

  const totalSeconds = Math.floor(seconds);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(t("common:duration.hour", { count: hours }));
  }

  if (minutes > 0) {
    parts.push(t("common:duration.minute", { count: minutes }));
  }

  if (secs > 0 || parts.length === 0) {
    parts.push(t("common:duration.second", { count: secs }));
  }

  return parts.slice(0, 2).join(" ");
};

export const formatTimeRange = (
  startedAt: DateInput,
  closedAt: DateInput,
  options: DateFormatterOptions = {},
): string => {
  if (!startedAt || !closedAt) return "";

  const start = formatTime(startedAt, options);
  const end = formatTime(closedAt, options);

  if (!start || !end) return "";

  return `${start} - ${end}`;
};

/**
 * Unix timestamp(초) 두 개의 차이를 초 단위 실수로 반환.
 *
 * 둘 중 하나라도 비어 있으면 0을 반환.
 */
export const calculateTimeDiff = (
  visitedAt: number | undefined,
  closedAt: number | undefined | null,
): number => {
  if (!visitedAt || !closedAt) {
    return 0;
  }

  const visited = dayjs.unix(visitedAt);
  const closed = dayjs.unix(closedAt);

  return closed.diff(visited, "second", true);
};
