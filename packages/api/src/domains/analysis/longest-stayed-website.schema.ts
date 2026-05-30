import { z } from "zod";

import { CreateResponseSchema, isoDurationStringSchema } from "../../schema";

export const TopVisitedSiteSchema = z.object({
  domain: z.string().nullable(),
  faviconUrl: z.string().nullable(),
  stayDuration: isoDurationStringSchema,
});

export const TopVisitedSiteResponseSchema =
  CreateResponseSchema(TopVisitedSiteSchema);

export type LongestWebSiteData = z.infer<typeof TopVisitedSiteSchema>;
