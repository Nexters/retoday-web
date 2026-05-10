import { CreateResponseSchema, dateStringSchema } from "@recap/api";
import { z } from "zod";

const WebsiteAnalysisSchema = z.object({
  domain: z.string(),
  faviconUrl: z.string().nullable(),
  visitCount: z.number(),
  stayDuration: z.number(),
});

const GetWebsiteAnalysesSchema = z.object({
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
