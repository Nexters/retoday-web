import { CreateResponseSchema, dateStringSchema } from "@recap/api";
import { z } from "zod";

export const TopVisitedSiteSchema = z.object({
  date: dateStringSchema,
  domain: z.string().nullable(),
  faviconUrl: z.string().nullable(),
  stayDuration: z.number(),
});

export const TopVisitedSiteResponseSchema =
  CreateResponseSchema(TopVisitedSiteSchema);
