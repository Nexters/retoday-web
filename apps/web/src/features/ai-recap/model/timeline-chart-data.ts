import type { RecapTimeline } from "@/features/ai-recap/model/recap.type";
import type { TimelineDatum } from "@/shared/ui/TimeLine";

export const toTimelineChartData = (
  timelines: RecapTimeline[],
  formatDurationLabel: (durationSeconds: number) => string,
): TimelineDatum[] =>
  timelines.map((timeline, index) => ({
    id: `${timeline.title}-${index}`,
    title: timeline.title,
    startedAt: timeline.startedAt,
    endedAt: timeline.endedAt,
    durationLabel: formatDurationLabel(timeline.durationMinutes * 60),
  }));
