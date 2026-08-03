"use client";

import { useSearchParams } from "next/navigation";
import type { RecapData } from "@recap/api";
import { useSuspenseQuery } from "@tanstack/react-query";

import { AuthConsumer } from "@/entities/auth/ui";
import { aiRecapQueryOptions } from "@/features/ai-recap/api/ai-recap-query.client";
import { hasRecapContent } from "@/features/ai-recap/lib/recap-mapper";
import AiTimeline from "@/features/ai-recap/ui/AiTimeline";
import RecapSummary from "@/features/ai-recap/ui/RecapSummary";
import TopVisitedTopics from "@/features/ai-recap/ui/TopVisitedTopics";
import AiRecapEmptyPage from "@/pages/ai-recap/ui/AiRecapEmptyPage";
import AiRecapLoadingPage from "@/pages/ai-recap/ui/AiRecapLoadingPage";
import AiRecapUnloginPage from "@/pages/ai-recap/ui/AiRecapUnloginPage";
import { getSafeQueryDate } from "@/shared/lib/date/safe-query-date";

const AiRecapPage = () => (
  <AuthConsumer>
    {({ isReady, isLoggedIn }) => {
      if (!isReady) return <AiRecapLoadingPage />;
      if (!isLoggedIn) return <AiRecapUnloginPage />;
      return <LoggedInRecap />;
    }}
  </AuthConsumer>
);

const LoggedInRecap = () => {
  const searchParams = useSearchParams();
  const rawDate = searchParams?.get("date");
  const date = getSafeQueryDate(rawDate);

  const { data: recap } = useSuspenseQuery({
    ...aiRecapQueryOptions(date),
    select: (data): RecapData | null => {
      const recap = data.data;
      return recap && hasRecapContent(recap) ? recap : null;
    },
  });

  if (!recap) return <AiRecapEmptyPage />;

  return (
    <>
      <RecapSummary recap={recap} />
      <AiTimeline timelines={recap.timelines ?? []} />
      <TopVisitedTopics topics={recap.topics ?? []} />
    </>
  );
};

export default AiRecapPage;
