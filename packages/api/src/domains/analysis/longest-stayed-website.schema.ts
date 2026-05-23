import { z } from "zod";

import { CreateResponseSchema, dateStringSchema } from "../../schema";

export const TopVisitedSiteSchema = z.object({
  date: dateStringSchema,
  domain: z.string().nullable(),
  faviconUrl: z.string().nullable(),
  stayDuration: z.number(),
});

export const TopVisitedSiteResponseSchema =
  CreateResponseSchema(TopVisitedSiteSchema);

export type LongestWebSiteData = z.infer<typeof TopVisitedSiteSchema>;
