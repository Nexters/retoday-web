import type { AnalysisCategoryData, CategoryAnalysisItem } from "@recap/api";

export type CategoryAnalysisState = {
  categories: CategoryAnalysisItem[];
};

export const toCategoryAnalysisState = (
  data: AnalysisCategoryData | null | undefined,
): CategoryAnalysisState => ({
  categories: [...(data?.categoryAnalyses ?? [])].sort(
    (a, b) => b.stayDuration - a.stayDuration,
  ),
});
