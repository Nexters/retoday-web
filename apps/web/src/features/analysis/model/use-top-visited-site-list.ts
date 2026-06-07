import { useGetFrequencyVisitedSites } from "@/features/analysis/api/analysis-query";
import { CURRENT_LOCATION } from "@/shared/config/location";

const useTopVisitedSiteList = (date: string) => {
  const { data, isLoading } = useGetFrequencyVisitedSites({
    date,
    limit: 10,
    timeZone: CURRENT_LOCATION,
  });

  return {
    data: [...(data?.websiteAnalyses ?? [])]
      .sort((a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0))
      .slice(0, 10),
    isLoading,
  };
};

export { useTopVisitedSiteList };
