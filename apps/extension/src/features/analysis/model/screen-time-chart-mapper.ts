import type { WeeklyBarDatum } from "@recap/ui";
import dayjs from "dayjs";

import {
  ANALYSIS_PERIOD,
  type AnalysisPeriod,
  type AnalysisScreenTimeResponse,
} from "@/features/analysis/model/analysis.type";
import { DATE_FORMAT } from "@/shared/config/date-format.const";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"] as const;

function transformScreenTimeToChartData(
  mode: AnalysisPeriod,
  screenTimeRes: AnalysisScreenTimeResponse,
): WeeklyBarDatum[] {
  if (mode === ANALYSIS_PERIOD.WEEKLY) {
    const { screenTimes } = screenTimeRes;

    if (!screenTimes || screenTimes.length === 0) {
      return WEEKDAY_LABELS.map((label, idx) => ({
        key: `week-${idx}-${label}`,
        label,
        subLabel: "",
        totalMinutes: 0,
        avgMinutes: 0,
      }));
    }

    const blocks = screenTimes.map((screenTime, idx) => {
      const date = dayjs(screenTime.startedAt);
      const weekdayIndex = date.day();
      const label =
        WEEKDAY_LABELS[weekdayIndex] ?? WEEKDAY_LABELS[idx % 7] ?? "일";

      // stayDuration은 초 단위이므로 분으로 변환
      const totalMinutes = Math.floor(screenTime.stayDuration / 60);

      return {
        key: `week-${idx}-${label}`,
        label,
        subLabel: date.format(DATE_FORMAT.MM_DD),
        totalMinutes,
        avgMinutes: totalMinutes,
      };
    });

    // 7일이 아닌 경우 빈 데이터로 채우기
    while (blocks.length < 7) {
      const idx = blocks.length;
      const label = WEEKDAY_LABELS[idx % 7] ?? "일";
      blocks.push({
        key: `week-${idx}-${label}`,
        label,
        subLabel: "",
        totalMinutes: 0,
        avgMinutes: 0,
      });
    }

    return blocks;
  }
  if (mode === ANALYSIS_PERIOD.DAILY) {
    const { screenTimes } = screenTimeRes;

    // 12개의 시간대 블록 생성 (0시~22시, 2시간 간격)
    const blocks: WeeklyBarDatum[] = Array.from({ length: 12 }, (_, i) => {
      const startHour = i * 2;
      return {
        key: `today-${startHour}`,
        label: String(startHour),
        subLabel: `오늘 ${String(startHour).padStart(2, "0")}:00 - ${String(
          startHour + 2,
        ).padStart(2, "0")}:00`,
        totalMinutes: 0,
        avgMinutes: 0,
      };
    });

    if (!screenTimes || screenTimes.length === 0) {
      return blocks;
    }

    // 각 screenTime을 시간대별로 그룹화
    screenTimes.forEach((screenTime) => {
      const startDate = dayjs(screenTime.startedAt);
      const startHour = startDate.hour();

      // stayDuration은 초 단위이므로 분으로 변환
      const totalMinutes = Math.floor(screenTime.stayDuration / 60);

      // 시작 시간이 속한 시간대 블록 찾기
      const blockIndex = Math.floor(startHour / 2);
      if (blockIndex >= 0 && blockIndex < blocks.length) {
        blocks[blockIndex]!.totalMinutes += totalMinutes;
      }
    });

    // avgMinutes는 totalMinutes와 동일하게 설정 (DAILY 모드에서는 동일)
    blocks.forEach((block) => {
      block.avgMinutes = block.totalMinutes;
    });

    return blocks;
  }

  return [];
}

export { transformScreenTimeToChartData };
