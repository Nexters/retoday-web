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
  if (seconds < 0) return "0분";

  const dur = dayjs.duration(seconds, "seconds");
  const hours = dur.hours();
  const minutes = dur.minutes();

  if (hours > 0) {
    if (minutes > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    return `${hours}시간`;
  }

  if (minutes > 0) {
    return `${minutes}분`;
  }

  return "0분";
};
