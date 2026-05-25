import type { AnalysisScreenTimeData, ScreenTimePeriodType } from "@recap/api";
import { dayjs } from "@recap/lib";

/**
 * `.env.local`에 `NEXT_PUBLIC_SCREEN_TIME_UI_MOCK=true` 를 넣으면
 * 스크린타임 API 대신 목 데이터로 차트/UI를 확인할 수 있습니다.
 */
export function isScreenTimeUIMockEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SCREEN_TIME_UI_MOCK === "true";
}

/** `GetScreenTimeSchema` 형태와 동일한 목 응답 (날짜는 `anchorDate` 기준). */
export function getMockAnalysisScreenTimeData(
  period: ScreenTimePeriodType,
  anchorDate: string,
): AnalysisScreenTimeData {
  const anchor = dayjs(anchorDate);

  if (period === "DAILY") {
    const dayStart = anchor.startOf("day");

    const blocks = [
      { h: 8, m: 0, durSeconds: 45 * 60 },
      { h: 9, m: 30, durSeconds: 30 * 60 },
      { h: 12, m: 0, durSeconds: 90 * 60 },
      { h: 15, m: 0, durSeconds: 120 * 60 },
      { h: 20, m: 0, durSeconds: 60 * 60 },
    ] as const;

    const screenTimes = blocks.map(({ h, m, durSeconds }) => {
      const start = dayStart.hour(h).minute(m).second(0).millisecond(0);
      const startedAt = start.toDate();
      const endedAt = start.add(durSeconds, "second").toDate();
      return {
        startedAt,
        endedAt,
        stayDuration: durSeconds,
      };
    });

    const totalStayDuration = blocks.reduce(
      (acc, { durSeconds }) => acc + durSeconds,
      0,
    );

    return {
      period: "DAILY",
      startedAt: dayStart.toDate(),
      endedAt: dayStart.endOf("day").toDate(),
      totalStayDuration,
      screenTimes,
    };
  }

  const dow = anchor.day();
  const weekStartSunday = anchor.subtract(dow, "day").startOf("day");
  const weekEndSaturday = weekStartSunday.add(6, "day").endOf("day");

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

    const startedAt = start.toDate();
    const endedAt = start.add(durSeconds, "second").toDate();

    return {
      startedAt,
      endedAt,
      stayDuration: durSeconds,
    };
  });

  const totalStayDuration = screenTimes.reduce(
    (acc, st) => acc + st.stayDuration,
    0,
  );

  return {
    period: "WEEKLY",
    startedAt: weekStartSunday.toDate(),
    endedAt: weekEndSaturday.toDate(),
    totalStayDuration,
    screenTimes,
  };
}
