import type { AnalysisCategoryData } from "@recap/api";

export type CategoryAnalysisState = {
  categories: AnalysisCategoryData["categoryAnalyses"];
};

export const toCategoryAnalysisState = (
  data: AnalysisCategoryData | null | undefined,
): CategoryAnalysisState => ({
  categories: [...(data?.categoryAnalyses ?? [])].sort(
    (a, b) => b.stayDuration - a.stayDuration,
  ),
});
