import type { AnalysisScreenTimeData, ScreenTimePeriodType } from "@recap/api";
import { GetScreenTimeSchema } from "@recap/api";
import { dayjs } from "@recap/lib";

import { getSafeQueryDate } from "@/shared/lib/date/safe-query-date";

const ISO_DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";

/**
 * `.env.local`에 `NEXT_PUBLIC_SCREEN_TIME_UI_MOCK=true` 를 넣으면
 * 스크린타임 API 대신 목 데이터로 차트/UI를 확인할 수 있습니다.
 */
export function isScreenTimeUIMockEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SCREEN_TIME_UI_MOCK === "true";
}

const resolveAnchor = (anchorDate: string) => {
  const safeDate = getSafeQueryDate(anchorDate || null);
  return dayjs(safeDate).startOf("day");
};

const toIsoDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  let duration = "PT";
  if (h > 0) duration += `${h}H`;
  if (m > 0) duration += `${m}M`;
  if (s > 0 || duration === "PT") duration += `${s}S`;

  return duration;
};

/** `GetScreenTimeSchema` 형태와 동일한 목 응답 (날짜는 `anchorDate` 기준). */
export function getMockAnalysisScreenTimeData(
  period: ScreenTimePeriodType,
  anchorDate: string,
): AnalysisScreenTimeData {
  const dayStart = resolveAnchor(anchorDate);

  if (period === "DAILY") {
    const blocks = [
      { h: 8, m: 0, durSeconds: 45 * 60 },
      { h: 9, m: 30, durSeconds: 30 * 60 },
      { h: 12, m: 0, durSeconds: 90 * 60 },
      { h: 15, m: 0, durSeconds: 120 * 60 },
      { h: 20, m: 0, durSeconds: 60 * 60 },
    ] as const;

    const screenTimes = blocks.map(({ h, m, durSeconds }) => {
      const start = dayStart.hour(h).minute(m).second(0).millisecond(0);
      const end = start.add(durSeconds, "second");

      return {
        startedAt: start.format(ISO_DATETIME_FORMAT),
        endedAt: end.format(ISO_DATETIME_FORMAT),
        stayDuration: toIsoDuration(durSeconds),
      };
    });

    const totalStayDuration = blocks.reduce(
      (acc, { durSeconds }) => acc + durSeconds,
      0,
    );

    return GetScreenTimeSchema.parse({
      totalStayDuration: toIsoDuration(totalStayDuration),
      screenTimes,
    });
  }

  const weekStartSunday = dayStart.subtract(dayStart.day(), "day");

  const weekBlocks = [
    { dayOffset: 0, h: 10, durSeconds: 120 * 60 },
    { dayOffset: 1, h: 14, durSeconds: 180 * 60 },
    { dayOffset: 2, h: 9, durSeconds: 240 * 60 },
    { dayOffset: 3, h: 16, durSeconds: 90 * 60 },
    { dayOffset: 4, h: 11, durSeconds: 300 * 60 },
    { dayOffset: 5, h: 13, durSeconds: 150 * 60 },
    { dayOffset: 6, h: 19, durSeconds: 200 * 60 },
  ] as const;

  const screenTimes = weekBlocks.map(({ dayOffset, h, durSeconds }) => {
    const start = weekStartSunday
      .add(dayOffset, "day")
      .hour(h)
      .minute(0)
      .second(0)
      .millisecond(0);
    const end = start.add(durSeconds, "second");

    return {
      startedAt: start.format(ISO_DATETIME_FORMAT),
      endedAt: end.format(ISO_DATETIME_FORMAT),
      stayDuration: toIsoDuration(durSeconds),
    };
  });

  const totalStayDuration = weekBlocks.reduce(
    (acc, { durSeconds }) => acc + durSeconds,
    0,
  );

  return GetScreenTimeSchema.parse({
    totalStayDuration: toIsoDuration(totalStayDuration),
    screenTimes,
  });
}
