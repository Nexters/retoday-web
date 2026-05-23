import { z } from "zod";

import { CreateResponseSchema, dateStringSchema } from "../../schema";

const CategoryWebsiteAnalysisSchema = z.object({
  domain: z.string(),
  faviconUrl: z.string().nullable(),
  stayDuration: z.number(),
});

const CategoryAnalysisItemSchema = z.object({
  categoryName: z.string(),
  stayDuration: z.number(),
  websiteAnalyses: z.array(CategoryWebsiteAnalysisSchema),
});

export const GetCategoryAnalysesSchema = z.object({
  date: dateStringSchema,
  categoryAnalyses: z.array(CategoryAnalysisItemSchema),
});

export const GetCategoryAnalysesResponseSchema = CreateResponseSchema(
  GetCategoryAnalysesSchema,
);

export type AnalysisCategoryData = z.infer<typeof GetCategoryAnalysesSchema>;
