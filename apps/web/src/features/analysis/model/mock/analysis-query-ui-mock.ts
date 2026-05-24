import type {
  AnalysisCategoryData,
  AnalysisWorkPatternData,
  FrequencyVisitedSitesData,
  LongestWebSiteData,
} from "@recap/api";
import { dayjs } from "@recap/lib";

const mockDateFor = (anchorDate: string) =>
  dayjs(anchorDate).startOf("day").toDate();

/** `GetCategoryAnalysesSchema` 형태 목 */
export function getMockAnalysisCategoryData(
  date: string,
): AnalysisCategoryData {
  return {
    date: mockDateFor(date),
    categoryAnalyses: [
      {
        categoryName: "쇼핑",
        stayDuration: 12_600,
        websiteAnalyses: [
          {
            domain: "shopping.example.com",
            faviconUrl: null,
            stayDuration: 7200,
          },
          {
            domain: "deals.example.com",
            faviconUrl: null,
            stayDuration: 5400,
          },
        ],
      },
      {
        categoryName: "개발·도구",
        stayDuration: 18_900,
        websiteAnalyses: [
          {
            domain: "github.com",
            faviconUrl: null,
            stayDuration: 8100,
          },
          {
            domain: "docs.example.dev",
            faviconUrl: null,
            stayDuration: 10_800,
          },
        ],
      },
      {
        categoryName: "영상·스트리밍",
        stayDuration: 5400,
        websiteAnalyses: [
          {
            domain: "video.example.tv",
            faviconUrl: null,
            stayDuration: 5400,
          },
        ],
      },
    ],
  };
}

/** `TopVisitedSiteSchema` 형태 목 */
export function getMockLongestWebSiteData(date: string): LongestWebSiteData {
  return {
    date: mockDateFor(date),
    domain: "youtube.com",
    faviconUrl: null,
    stayDuration: 14_400,
  };
}

/** `GetWebsiteAnalysesSchema` 형태 목 (limit 10 UI 기준). */
export function getMockFrequencyVisitedSitesData(
  date: string,
): FrequencyVisitedSitesData {
  const rows = [
    { domain: "mail.example.com", visitCount: 42, stayDuration: 7800 },
    { domain: "news.example.net", visitCount: 38, stayDuration: 6600 },
    { domain: "calendar.example.io", visitCount: 55, stayDuration: 5400 },
    { domain: "slack.example.app", visitCount: 120, stayDuration: 8100 },
    { domain: "docs.google.com", visitCount: 24, stayDuration: 9300 },
    { domain: "github.com", visitCount: 18, stayDuration: 12_600 },
    { domain: "stackoverflow.com", visitCount: 30, stayDuration: 8400 },
    { domain: "linear.example.dev", visitCount: 62, stayDuration: 5700 },
    { domain: "figma.example.com", visitCount: 15, stayDuration: 7200 },
    { domain: "notion.site", visitCount: 41, stayDuration: 6900 },
  ];

  return {
    date: mockDateFor(date),
    websiteAnalyses: rows.map((r) => ({
      domain: r.domain,
      faviconUrl: null,
      visitCount: r.visitCount,
      stayDuration: r.stayDuration,
    })),
  };
}

/** `GetWorkPatternSchema` 형태 목 */
export function getMockWorkPatternData(date: string): AnalysisWorkPatternData {
  return {
    date: mockDateFor(date),
    counts: {
      DAWN: 2,
      MORNING: 5,
      DAYTIME: 4,
      EVENING: 3,
    },
  };
}
