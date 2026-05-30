"use client";

import { Stack } from "@recap/ui";

import { AiRecapIntroCard } from "@/features/ai-recap/ui/AiRecapIntroCard";
import { AiRecapPreviewCard } from "@/features/ai-recap/ui/AiRecapPreviewCard";

const AiRecapEmptyPage = () => (
  <Stack gap="none" className="gap-4 md:gap-5 xl:gap-7">
    <AiRecapIntroCard />
    <AiRecapPreviewCard />
  </Stack>
);

export default AiRecapEmptyPage;
