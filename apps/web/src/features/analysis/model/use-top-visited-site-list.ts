import { CURRENT_TIMEZONE } from "@recap/lib";

import { useGetFrequencyVisitedSites } from "@/features/analysis/api/analysis-query";

const useTopVisitedSiteList = (date: string) => {
  const { data, isLoading } = useGetFrequencyVisitedSites({
    date,
    limit: 10,
    timeZone: CURRENT_TIMEZONE,
  });

  return {
    data: [...(data?.websiteAnalyses ?? [])]
      .sort((a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0))
      .slice(0, 10),
    isLoading,
  };
};

export { useTopVisitedSiteList };
