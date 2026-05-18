"use client";

import { AuthConsumer } from "@/entities/auth/ui";
import { useGetAiRecap } from "@/features/ai-recap/api/ai-recap-query";
import RecapSummary from "@/features/ai-recap/ui/RecapSummary";
import Timeline from "@/features/ai-recap/ui/Timeline";
import TopVisitedTopics from "@/features/ai-recap/ui/TopVisitedTopics";
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
    recap,
    hasRecap,
    isError,
    isLoading,
    isFetching,
    isFetchedAfterMount,
  } = useGetAiRecap(date);

  const shouldShowLoading = isLoading || (isFetching && !isFetchedAfterMount);

  if (shouldShowLoading) return <AiRecapLoadingPage />;
  if (isError || !hasRecap || !recap) return <AiRecapUnloginPage />;

  return (
    <>
      <RecapSummary recap={recap} />
      <Timeline recap={recap} />
      <TopVisitedTopics recap={recap} />
    </>
  );
};

export default AiRecapPage;
