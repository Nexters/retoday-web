import type { recapAPIService } from "@/features/ai-recap/api";

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

export { hasRecapContent };
