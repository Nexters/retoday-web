import { z } from "zod";

import {
  CreateResponseSchema,
  dateStringSchema,
  isoDurationStringSchema,
} from "../../schemas";

export const RecapSectionSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const RecapImageEnum = z.enum([
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
  "AI",
  "DEVELOPMENT",
  "SCREEN_TIME_OVER_12H",
  "SCREEN_TIME_UNDER_1H",
  "CATEGORY_OVER_5",
  "CATEGORY_ONLY_1",
  "START_AFTER_9PM",
  "START_BEFORE_9AM",
  "RANDOM_1",
  "RANDOM_2",
  "RANDOM_3",
]);

export type RecapImageType = z.infer<typeof RecapImageEnum>;

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
  image: RecapImageEnum.nullable().optional(),
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
