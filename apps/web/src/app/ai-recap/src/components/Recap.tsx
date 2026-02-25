"use client";

import { useQuery } from "@tanstack/react-query";

import RecapSummary from "@/app/ai-recap/src/components/RecapSummary";
import Timeline from "@/app/ai-recap/src/components/Timeline";
import TopVisitedTopics from "@/app/ai-recap/src/components/TopVisitedTopics";
import { recapAPIService } from "@/app/ai-recap/src/service";

const Recap = ({ date }: { date: string }) => {
  const { data } = useQuery({
    queryKey: ["generateRecap", date],
    queryFn: () => recapAPIService.getRecap({ date }),
  });

  console.log(data);

  return (
    <>
      <RecapSummary />
      <Timeline />
      <TopVisitedTopics />
    </>
  );
};

export default Recap;
