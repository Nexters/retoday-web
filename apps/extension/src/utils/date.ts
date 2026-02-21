import dayjs from "dayjs";

import { DATE_FORMAT, type DateFormat } from "@/const/date-format.const";

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
