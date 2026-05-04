import { CreateResponseSchema, dateStringSchema } from "@recap/api";
import { z } from "zod";

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

const GetCategoryAnalysesSchema = z.object({
  date: dateStringSchema,
  categoryAnalyses: z.array(CategoryAnalysisItemSchema),
});

export const GetCategoryAnalysesResponseSchema = CreateResponseSchema(
  GetCategoryAnalysesSchema,
);
