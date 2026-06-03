import { z } from "zod";

import { CreateResponseSchema, isoDurationStringSchema } from "../../schema";

const CategoryEnum = z.enum([
  "STUDY",
  "SHOPPING",
  "GAMING",
  "CONTENT",
  "COMMUNITY",
  "NEWS",
  "FINANCE",
  "LIFE",
  "BROWSING",
  "DESIGN",
  "DEVELOPMENT",
  "AI",
  "ETC",
]);

export type CategoryType = z.infer<typeof CategoryEnum>;

const CategoryWebsiteAnalysisSchema = z.object({
  domain: z.string(),
  faviconUrl: z.string().nullable(),
  stayDuration: isoDurationStringSchema,
});

export type CategoryWebsiteAnalysis = z.infer<
  typeof CategoryWebsiteAnalysisSchema
>;

const CategoryAnalysisItemSchema = z.object({
  category: CategoryEnum,
  stayDuration: isoDurationStringSchema,
  websiteAnalyses: z.array(CategoryWebsiteAnalysisSchema),
});

export type CategoryAnalysisItem = z.infer<typeof CategoryAnalysisItemSchema>;

export const GetCategoryAnalysesSchema = z.object({
  totalStayDuration: isoDurationStringSchema,
  categoryAnalyses: z.array(CategoryAnalysisItemSchema),
});

export const GetCategoryAnalysesResponseSchema = CreateResponseSchema(
  GetCategoryAnalysesSchema,
);

export type AnalysisCategoryData = z.infer<typeof GetCategoryAnalysesSchema>;
