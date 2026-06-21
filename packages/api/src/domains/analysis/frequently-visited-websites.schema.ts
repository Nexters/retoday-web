import { z } from "zod";

import { CreateResponseSchema, isoDurationStringSchema } from "../../schemas";
import { TimeZoneSchema } from "../../schemas/enum.schema";

const WebsiteAnalysisSchema = z.object({
  domain: z.string(),
  faviconUrl: z.string().nullable(),
  visitCount: z.number(),
  stayDuration: isoDurationStringSchema,
});

export const GetWebsiteAnalysesSchema = z.object({
  websiteAnalyses: z.array(WebsiteAnalysisSchema),
});

export const GetWebsiteAnalysesResponseSchema = CreateResponseSchema(
  GetWebsiteAnalysesSchema,
);

export const GetWebsiteAnalysesQuerySchema = z.object({
  date: z.string(),
  limit: z.number(),
  timeZone: TimeZoneSchema,
});

export type GetWebsiteAnalysesQueryType = z.infer<
  typeof GetWebsiteAnalysesQuerySchema
>;

export type FrequencyVisitedSitesData = z.infer<
  typeof GetWebsiteAnalysesSchema
>;
