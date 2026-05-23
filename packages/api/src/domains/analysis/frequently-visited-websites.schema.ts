import { z } from "zod";

import { CreateResponseSchema, dateStringSchema } from "../../schema";

const WebsiteAnalysisSchema = z.object({
  domain: z.string(),
  faviconUrl: z.string().nullable(),
  visitCount: z.number(),
  stayDuration: z.number(),
});

export const GetWebsiteAnalysesSchema = z.object({
  date: dateStringSchema,
  websiteAnalyses: z.array(WebsiteAnalysisSchema),
});

export const GetWebsiteAnalysesResponseSchema = CreateResponseSchema(
  GetWebsiteAnalysesSchema,
);

export const GetWebsiteAnalysesQuerySchema = z.object({
  date: z.string(),
  limit: z.number(),
});

export type GetWebsiteAnalysesQueryType = z.infer<
  typeof GetWebsiteAnalysesQuerySchema
>;

export type FrequencyVisitedSitesData = z.infer<
  typeof GetWebsiteAnalysesSchema
>;
