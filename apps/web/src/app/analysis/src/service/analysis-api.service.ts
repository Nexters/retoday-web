import type { RestAPIProtocol } from "@recap/api";

import type { DateQueryType } from "@/app/analysis/src/service/schema/enum.schema";
import { GetCategoryAnalysesResponseSchema } from "@/app/analysis/src/service/schema/get-category-analysis.schema";
import {
  type GetWebsiteAnalysesQueryType,
  GetWebsiteAnalysesResponseSchema,
} from "@/app/analysis/src/service/schema/get-frequently-visited-websites.schema";
import { TopVisitedSiteResponseSchema } from "@/app/analysis/src/service/schema/get-longest-stayed-website.schema";
import {
  type GetScreenTimeQueryType,
  GetScreenTimeResponseSchema,
} from "@/app/analysis/src/service/schema/get-screen-time.schema";
import { GetWorkPatternResponseSchema } from "@/app/analysis/src/service/schema/get-work-pattern.schema";

export class AnalysisAPIService {
  constructor(private fetch: RestAPIProtocol) {}

  getScreenTime(query?: GetScreenTimeQueryType) {
    return this.fetch.get({
      url: "users/me/screen-times",
      query: {
        ...query,
      },
      validate: GetScreenTimeResponseSchema.parse,
    });
  }

  getWorkPattern(query?: DateQueryType) {
    return this.fetch.get({
      url: "users/me/work-pattern",
      query: {
        ...query,
      },
      validate: GetWorkPatternResponseSchema.parse,
    });
  }

  getFrequentlyVisitedWebSite(query?: GetWebsiteAnalysesQueryType) {
    return this.fetch.get({
      url: "users/me/frequently-visited-websites",
      query: {
        ...query,
      },
      validate: GetWebsiteAnalysesResponseSchema.parse,
    });
  }

  getLongestStayedWebsite(query?: DateQueryType) {
    return this.fetch.get({
      url: "users/me/longest-stayed-website",
      query: {
        ...query,
      },
      validate: TopVisitedSiteResponseSchema.parse,
    });
  }

  getCategoryAnalysis(query?: DateQueryType) {
    return this.fetch.get({
      url: "users/me/category-analyses",
      query: {
        ...query,
      },
      validate: GetCategoryAnalysesResponseSchema.parse,
    });
  }
}
