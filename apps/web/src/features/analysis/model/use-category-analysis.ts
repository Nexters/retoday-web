import { useGetAnalysisCategoryAnalysis } from "@/features/analysis/api/analysis-query";

const useCategoryAnalysis = (date: string) => {
  // const data = getMockAnalysisCategoryData(date);
  // const isLoading = false;
  const { data, isLoading } = useGetAnalysisCategoryAnalysis(date);

  return {
    data: {
      categories: [...(data?.categoryAnalyses ?? [])].sort(
        (a, b) => (b.stayDuration ?? 0) - (a.stayDuration ?? 0),
      ),
    },
    isLoading,
  };
};

export { useCategoryAnalysis };
