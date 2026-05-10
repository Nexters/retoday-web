import type { recapAPIService } from "@/features/ai-recap/api";
import type { NormalizedRecap } from "@/features/ai-recap/model/recap.type";

type RawRecap = NonNullable<
  Awaited<ReturnType<typeof recapAPIService.getRecap>>["data"]
>;

const hasRecapContent = (raw: RawRecap) =>
  Boolean(
    raw.title?.trim() ||
    raw.summary?.trim() ||
    raw.sections?.length ||
    raw.timelines?.length ||
    raw.topics?.length,
  );

const normalizeRecap = (raw: RawRecap, date: string): NormalizedRecap => ({
  id: raw.id ?? 0,
  userId: raw.userId ?? 0,
  recapDate: raw.recapDate ?? date,
  title: raw.title ?? "-",
  summary: raw.summary ?? "-",
  imageUrl: raw.imageUrl ?? null,
  startedAt: raw.startedAt ?? new Date(0),
  closedAt: raw.closedAt ?? new Date(0),
  sections: raw.sections ?? [],
  timelines: raw.timelines ?? [],
  topics: raw.topics ?? [],
});
export { hasRecapContent, normalizeRecap };
