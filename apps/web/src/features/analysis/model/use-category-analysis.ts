import { CURRENT_TIMEZONE } from "@recap/lib";

import { useGetAnalysisCategory } from "@/features/analysis/api/analysis-query";

const useCategoryAnalysis = (date: string) => {
  const { data, isLoading } = useGetAnalysisCategory({
    date,
    timeZone: CURRENT_TIMEZONE,
  });

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
