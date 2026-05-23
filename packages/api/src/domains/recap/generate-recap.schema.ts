import { z } from "zod";

import { CreateResponseSchema, dateStringSchema } from "../../schema";

export const RecapSectionSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const RecapTimelineSchema = z.object({
  startedAt: z.string(),
  endedAt: z.string(),
  title: z.string(),
  durationMinutes: z.number(),
});

export const RecapTopicSchema = z.object({
  keyword: z.string(),
  title: z.string(),
  content: z.string(),
});

export const RecapSchema = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  recapDate: z.string().optional(),
  title: z.string().optional(),
  summary: z.string().optional(),
  imageUrl: z.string().nullable().optional(),
  startedAt: dateStringSchema.optional(),
  closedAt: dateStringSchema.optional(),
  sections: z.array(RecapSectionSchema).optional(),
  timelines: z.array(RecapTimelineSchema).optional(),
  topics: z.array(RecapTopicSchema).optional(),
});

export const GetRecapResponseSchema = CreateResponseSchema(RecapSchema);

export type RecapData = z.infer<typeof RecapSchema>;

export type AiRecapSection = z.infer<typeof RecapSectionSchema>;
export type AiRecapTimeline = z.infer<typeof RecapTimelineSchema>;
export type AiRecapTopic = z.infer<typeof RecapTopicSchema>;
/** Alias for UI code that historically expected a shaped recap payload. */
export type AiRecapResponse = RecapData;
