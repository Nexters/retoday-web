"use client";

import RecapSummary from "@/app/ai-recap/src/components/RecapSummary";
import Timeline from "@/app/ai-recap/src/components/Timeline";
import TopVisitedTopics from "@/app/ai-recap/src/components/TopVisitedTopics";
import { recapAPIService } from "@/app/ai-recap/src/service";

const Recap = ({ date }: { date: string }) => {
  //   const { data } = useQuery({
  //     queryKey: ["generateRecap", date],
  //     queryFn: () => recapAPIService.generateRecap({ date }),
  //   });

  //   console.log(data);

  const handleTest = async () => {
    try {
      await recapAPIService.generateRecap({ date });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button onClick={handleTest}>fsdf</button>
      <RecapSummary />
      <Timeline />
      <TopVisitedTopics />
    </>
  );
};

export default Recap;
