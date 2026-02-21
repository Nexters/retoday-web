import type { RestAPIProtocol } from "@recap/api";

import type { AnalysisPeriod } from "@/entities/analysis/model/analysis.type";

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
}
