import type { AiRecapTimeline } from "@recap/api";

import type { TimelineDatum } from "@/shared/ui/TimeLine";

export const toTimeLineChartState = (
  timelines: AiRecapTimeline[],
  formatDurationLabel: (durationSeconds: number) => string,
): TimelineDatum[] =>
  timelines.map((timeline, index) => ({
    id: `${timeline.title}-${index}`,
    title: timeline.title,
    startedAt: timeline.startedAt,
    endedAt: timeline.endedAt,
    durationLabel: formatDurationLabel(timeline.duration),
  }));
