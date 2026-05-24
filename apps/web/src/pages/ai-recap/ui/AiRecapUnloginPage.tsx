"use client";

import { Stack } from "@recap/ui";

import LoginBanner from "@/entities/login/ui/LoginBanner";
import { AiRecapIntroCard } from "@/features/ai-recap/ui/AiRecapIntroCard";
import { AiRecapPreviewCard } from "@/features/ai-recap/ui/AiRecapPreviewCard";

const AiRecapUnloginPage = () => (
  <Stack gap="none" className="gap-4 md:gap-5 xl:gap-7">
    <LoginBanner />
    <AiRecapIntroCard />
    <AiRecapPreviewCard />
  </Stack>
);

export default AiRecapUnloginPage;
