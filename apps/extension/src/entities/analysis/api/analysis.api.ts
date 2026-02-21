import type { RestAPIProtocol } from "@recap/api";

import type {
  AnalysisCategoryResponse,
  AnalysisPeriod,
} from "@/entities/analysis/model/analysis.type";

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
}
