import { useQuery } from "@recap/react-query";

import { analysisAPIService } from "@/entities/analysis/api";
import type {
  AnalysisPeriod,
  AnalysisScreenTimeResponse,
} from "@/entities/analysis/model/analysis.type";

import { ANALYSIS_KEYS } from "./query-key.const";

export const useGetAnalysisScreenTime = (
  period: AnalysisPeriod,
  date: string,
) => {
  return useQuery<AnalysisScreenTimeResponse>({
    queryKey: ANALYSIS_KEYS.detail(["screen-time", period, date]),
    queryFn: async () => {
      const response = await analysisAPIService.getScreenTime(period, date);
      return response as AnalysisScreenTimeResponse;
    },
  });
};
