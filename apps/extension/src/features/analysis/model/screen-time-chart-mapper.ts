import type { WeeklyBarDatum } from "@recap/ui";
import {
  type DateFormatterOptions,
  dayjs,
  formatDate,
  formatTwoDigitNumber,
  formatWeekdayShort,
  resolveDateFormatterOptions,
} from "@recap/utils";

import {
  ANALYSIS_PERIOD,
  type AnalysisPeriod,
  type AnalysisScreenTimeResponse,
} from "@/features/analysis/model/analysis.type";
import { DATE_FORMAT } from "@/shared/config/date-format.const";

export type ScreenTimeChartMapperOptions = DateFormatterOptions & {
  t: (key: string, options?: Record<string, unknown>) => string;
};

function transformScreenTimeToChartData(
  mode: AnalysisPeriod,
  screenTimeRes: AnalysisScreenTimeResponse,
  mapperOptions: ScreenTimeChartMapperOptions,
): WeeklyBarDatum[] {
  const { t, ...rawDateOpts } = mapperOptions;
  const { locale, timeZone } = resolveDateFormatterOptions(rawDateOpts);
  const formatOpts: DateFormatterOptions = { locale, timeZone };

  if (mode === ANALYSIS_PERIOD.WEEKLY) {
    const { screenTimes } = screenTimeRes;

    if (!screenTimes || screenTimes.length === 0) {
      return Array.from({ length: 7 }, (_, idx) => {
        const label = formatWeekdayShort(idx, formatOpts);
        return {
          key: `week-${idx}-${label}`,
          label,
          subLabel: "",
          totalMinutes: 0,
          avgMinutes: 0,
        };
      });
    }

    const blocks = screenTimes.map((screenTime, index) => {
      const zoned = dayjs(screenTime.startedAt).tz(timeZone);
      const label = formatWeekdayShort(zoned.day(), formatOpts);

      const totalMinutes = Math.floor(screenTime.stayDuration / 60);

      return {
        key: `week-${index}-${label}`,
        label,
        subLabel: formatDate(
          screenTime.startedAt,
          DATE_FORMAT.MM_DD,
          formatOpts,
        ),
        totalMinutes,
        avgMinutes: totalMinutes,
      };
    });

    while (blocks.length < 7) {
      const idx = blocks.length;
      const label = formatWeekdayShort(idx % 7, formatOpts);
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

    const blocks: WeeklyBarDatum[] = Array.from({ length: 12 }, (_, i) => {
      const startHour = i * 2;
      return {
        key: `today-${startHour}`,
        label: String(startHour),
        subLabel: t("screenTime.dailyTimeSlotSubLabel", {
          start: formatTwoDigitNumber(startHour),
          end: formatTwoDigitNumber(startHour + 2),
        }),
        totalMinutes: 0,
        avgMinutes: 0,
      };
    });

    if (!screenTimes || screenTimes.length === 0) {
      return blocks;
    }

    screenTimes.forEach((screenTime) => {
      const startDate = dayjs(screenTime.startedAt).tz(timeZone);
      const startHour = startDate.hour();
      const totalMinutes = Math.floor(screenTime.stayDuration / 60);
      const blockIndex = Math.floor(startHour / 2);
      if (blockIndex >= 0 && blockIndex < blocks.length) {
        blocks[blockIndex]!.totalMinutes += totalMinutes;
      }
    });

    blocks.forEach((block) => {
      block.avgMinutes = block.totalMinutes;
    });

    return blocks;
  }

  return [];
}

export { transformScreenTimeToChartData };
