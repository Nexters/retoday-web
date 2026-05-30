import { GetCategoryAnalysesResponseSchema } from "../domains/analysis/category-analysis.schema";
import type {
  DateQueryType,
  DateTimeZoneQueryType,
} from "../domains/analysis/enum.schema";
import {
  type GetWebsiteAnalysesQueryType,
  GetWebsiteAnalysesResponseSchema,
} from "../domains/analysis/frequently-visited-websites.schema";
import { TopVisitedSiteResponseSchema } from "../domains/analysis/longest-stayed-website.schema";
import {
  type GetScreenTimeQueryType,
  GetScreenTimeResponseSchema,
} from "../domains/analysis/screen-time.schema";
import { GetWorkPatternResponseSchema } from "../domains/analysis/work-pattern.schema";
import type { RestAPIProtocol } from "../rest/types";

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

  getCategoryAnalysis(query?: DateTimeZoneQueryType) {
    return this.fetch.get({
      url: "users/me/category-analyses",
      query: {
        ...query,
      },
      validate: GetCategoryAnalysesResponseSchema.parse,
    });
  }
}
