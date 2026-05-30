"use client";

import { AuthConsumer } from "@/entities/auth/ui";
import { useGetAiRecap } from "@/features/ai-recap/api/ai-recap-query";
import {
  hasRecapContent,
  normalizeRecap,
} from "@/features/ai-recap/lib/recap-mapper";
import type { NormalizedRecap } from "@/features/ai-recap/model/recap.type";
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
    select: (data): NormalizedRecap | null =>
      data && hasRecapContent(data) ? normalizeRecap(data, date) : null,
  });

  const shouldShowLoading = isLoading || (isFetching && !isFetchedAfterMount);

  if (shouldShowLoading) return <AiRecapLoadingPage />;
  if (isError || !recap) return <AiRecapEmptyPage />;

  return (
    <>
      <RecapSummary recap={recap} />
      <AiTimeline recap={recap} />
      <TopVisitedTopics recap={recap} />
    </>
  );
};

export default AiRecapPage;
