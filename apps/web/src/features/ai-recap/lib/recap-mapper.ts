import type { recapAPIService } from "@/features/ai-recap/api";
import type { NormalizedRecap } from "@/features/ai-recap/model/recap.type";

type RawRecap = NonNullable<
  Awaited<ReturnType<typeof recapAPIService.getRecap>>["data"]
>;

const hasRecapContent = (raw: RawRecap) =>
  Boolean(
    raw.recap?.title?.trim() ||
    raw.recap?.summary?.trim() ||
    raw.sections?.length ||
    raw.timelines?.length ||
    raw.topics?.length,
  );

const normalizeRecap = (raw: RawRecap, date: string): NormalizedRecap => ({
  recap: {
    id: raw.recap?.id ?? 0,
    userId: raw.recap?.userId,
    date: raw.recap?.date ?? date,
    title: raw.recap?.title ?? "-",
    summary: raw.recap?.summary ?? "-",
    image: raw.recap?.image ?? null,
    aiProvider: raw.recap?.aiProvider,
    startedAt: raw.recap?.startedAt,
    closedAt: raw.recap?.closedAt,
  },
  sections: raw.sections ?? [],
  timelines: raw.timelines ?? [],
  topics: raw.topics ?? [],
});

export { hasRecapContent, normalizeRecap };
