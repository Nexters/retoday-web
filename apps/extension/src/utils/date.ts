import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import { DATE_FORMAT, type DateFormat } from "@/const/date-format.const";

dayjs.extend(duration);

export const formatDate = (
  date: Date | undefined | null,
  format: DateFormat = DATE_FORMAT.YYYY_MM_DD,
): string => {
  if (!date) return "";
  return dayjs(date).format(format);
};

export function calculateTimeDiff(
  visitedAt: number | undefined,
  closedAt: number | undefined | null,
): number {
  if (!visitedAt || !closedAt) {
    return 0;
  }
  const visited = dayjs.unix(visitedAt);
  const closed = dayjs.unix(closedAt);
  return closed.diff(visited, "second", true);
}

export const formatDuration = (seconds: number): string => {
  if (seconds < 0) return "0초";

  const dur = dayjs.duration(seconds, "seconds");
  const hours = dur.hours();
  const minutes = dur.minutes();
  const secs = dur.seconds();

  if (hours > 0) {
    if (minutes > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    return `${hours}시간`;
  }

  if (minutes > 0) {
    if (secs > 0) {
      return `${minutes}분 ${secs}초`;
    }
    return `${minutes}분`;
  }

  return `${secs}초`;
};

export const formatTimeRange = (
  startedAt: string | undefined | null,
  closedAt: string | undefined | null,
): string => {
  if (!startedAt || !closedAt) return "";

  const start = dayjs(startedAt);
  const end = dayjs(closedAt);

  if (!start.isValid() || !end.isValid()) return "";

  const formatTime = (date: dayjs.Dayjs): string => {
    const minutes = date.minute();
    if (minutes === 0) {
      return date.format("ha");
    }
    return date.format("h:mma");
  };

  const startTime = formatTime(start);
  const endTime = formatTime(end);

  return `${startTime} - ${endTime}`;
};
