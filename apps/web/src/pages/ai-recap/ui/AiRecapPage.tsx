"use client";

import type { RecapData } from "@recap/api";

import { AuthConsumer } from "@/entities/auth/ui";
import { useGetAiRecap } from "@/features/ai-recap/api/ai-recap-query";
import { hasRecapContent } from "@/features/ai-recap/lib/recap-mapper";
import AiTimeline from "@/features/ai-recap/ui/AiTimeline";
import RecapSummary from "@/features/ai-recap/ui/RecapSummary";
import TopVisitedTopics from "@/features/ai-recap/ui/TopVisitedTopics";
import AiRecapEmptyPage from "@/pages/ai-recap/ui/AiRecapEmptyPage";
import AiRecapUnloginPage from "@/pages/ai-recap/ui/AiRecapUnloginPage";

import AiRecapLoadingPage from "./AiRecapLoadingPage";

const AiRecapPage = ({ date }: { date: string }) => (
  <AuthConsumer>
    {({ isReady, isLoggedIn }) => {
      if (!isReady) return <AiRecapLoadingPage />;
      if (!isLoggedIn) return <AiRecapUnloginPage />;
      return <LoggedInRecap date={date} />;
    }}
  </AuthConsumer>
);

const LoggedInRecap = ({ date }: { date: string }) => {
  const {
    data: recap,
    isError,
    isLoading,
    isFetching,
    isFetchedAfterMount,
  } = useGetAiRecap(date, {
    retry: 0,
    select: (data): RecapData | null =>
      data && hasRecapContent(data) ? data : null,
  });

  const shouldShowLoading = isLoading || (isFetching && !isFetchedAfterMount);

  if (shouldShowLoading) return <AiRecapLoadingPage />;
  if (isError || !recap) return <AiRecapEmptyPage />;

  return (
    <>
      <RecapSummary recap={recap} />
      <AiTimeline timelines={recap?.timelines ?? []} />
      <TopVisitedTopics topics={recap?.topics ?? []} />
    </>
  );
};

export default AiRecapPage;
