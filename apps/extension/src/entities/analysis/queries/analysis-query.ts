import { useQuery } from "@recap/react-query";

import { analysisAPIService } from "@/entities/analysis/api";
import type {
  AnalysisCategoryResponse,
  AnalysisPeriod,
  AnalysisScreenTimeResponse,
  FrequencyVisitedSitesResponse,
} from "@/entities/analysis/model/analysis.type";

import { ANALYSIS_KEYS } from "./query-key.const";

const useGetAnalysisScreenTime = (period: AnalysisPeriod, date: string) => {
  return useQuery<AnalysisScreenTimeResponse>({
    queryKey: ANALYSIS_KEYS.detail(["screen-time", period, date]),
    queryFn: async () => {
      const response = await analysisAPIService.getScreenTime(period, date);
      return response as AnalysisScreenTimeResponse;
    },
  });
};

const useGetAnalysisCategoryAnalysis = (date: string) => {
  return useQuery<AnalysisCategoryResponse>({
    queryKey: ANALYSIS_KEYS.detail(["category-analysis", date]),
    queryFn: async () => {
      const response = await analysisAPIService.getCategoryAnalysis(date);
      return response as AnalysisCategoryResponse;
    },
  });
};

const useGetFrequencyVisitedSites = (date: string, limit: number) => {
  return useQuery<FrequencyVisitedSitesResponse>({
    queryKey: ANALYSIS_KEYS.detail(["frequency-visited-sites", date, limit]),
    queryFn: async () => {
      const response = await analysisAPIService.getFrequencyVisitedSites(
        date,
        limit,
      );
      return response as FrequencyVisitedSitesResponse;
    },
  });
};
export {
  useGetAnalysisCategoryAnalysis,
  useGetAnalysisScreenTime,
  useGetFrequencyVisitedSites,
};
