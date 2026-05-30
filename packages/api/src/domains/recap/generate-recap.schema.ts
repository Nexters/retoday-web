import { z } from "zod";

import {
  CreateResponseSchema,
  dateStringSchema,
  isoDurationStringSchema,
} from "../../schema";

export const RecapSectionSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const RecapTimelineSchema = z.object({
  startedAt: z.string(),
  endedAt: z.string(),
  title: z.string(),
  duration: isoDurationStringSchema,
});

export const RecapTopicSchema = z.object({
  keyword: z.string(),
  title: z.string(),
  content: z.string(),
});

export const RecapDetailSchema = z.object({
  id: z.number(),
  userId: z.number().optional(),
  date: z.string().optional(),
  title: z.string().optional(),
  summary: z.string().optional(),
  image: z.string().nullable().optional(),
  aiProvider: z.string().optional(),
  startedAt: dateStringSchema.optional(),
  closedAt: dateStringSchema.optional(),
});

export const RecapSchema = z.object({
  recap: RecapDetailSchema.optional(),
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
