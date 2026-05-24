import { useGetFrequencyVisitedSites } from "@/features/analysis/api/analysis-query";

const useTopVisitedSiteList = (date: string) => {
  // const data = getMockFrequencyVisitedSitesData(date);
  // const isLoading = false;
  const { data, isLoading } = useGetFrequencyVisitedSites(date, 10);

  return {
    data: [...(data?.websiteAnalyses ?? [])]
      .sort((a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0))
      .slice(0, 10),
    isLoading,
  };
};

export { useTopVisitedSiteList };
