import type { RestAPIProtocol } from "@recap/api";

import type {
  AnalysisCategoryResponse,
  AnalysisPeriod,
  FrequencyVisitedSitesResponse,
  LongestWebSiteResponse,
} from "@/features/analysis/model/analysis.type";

export class AnalysisAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  getScreenTime(period: AnalysisPeriod, date: string) {
    const params = new URLSearchParams();
    params.set("period", period);
    params.set("date", date);
    return this.fetch.get({
      url: `users/me/screen-times?${params.toString()}`,
    });
  }

  getCategoryAnalysis(date: string) {
    return this.fetch.get<AnalysisCategoryResponse>({
      url: `users/me/category-analyses?date=${date}`,
    });
  }

  getFrequencyVisitedSites(date: string, limit: number) {
    return this.fetch.get<FrequencyVisitedSitesResponse>({
      url: `users/me/frequently-visited-websites?date=${date}&limit=${limit}`,
    });
  }

  getLongestWebSite(date: string) {
    return this.fetch.get<LongestWebSiteResponse>({
      url: `users/me/longest-stayed-website?date=${date}`,
    });
  }
}
