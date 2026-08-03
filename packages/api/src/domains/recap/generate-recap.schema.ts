import { z } from "zod";

import { CreateResponseSchema, isoDurationStringSchema } from "../../schemas";

const optionalText = z
  .string()
  .nullish()
  .transform((value) => value ?? undefined);

const text = z
  .string()
  .nullish()
  .transform((value) => value ?? "");

const optionalDate = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Invalid date string",
  })
  .transform((value) => new Date(value))
  .nullish()
  .transform((value) => value ?? undefined)
  .catch(undefined);

const durationSeconds = isoDurationStringSchema.catch(0);

export const RecapSectionSchema = z.object({
  title: text,
  content: text,
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
  startedAt: text,
  endedAt: text,
  title: text,
  duration: durationSeconds,
});

export const RecapTopicSchema = z.object({
  keyword: text,
  title: text,
  content: text,
});

export const RecapDetailSchema = z.object({
  id: optionalText,
  userId: optionalText,
  date: optionalText,
  title: optionalText,
  summary: optionalText,
  image: RecapImageEnum.nullish().catch(null),
  aiProvider: optionalText,
  startedAt: optionalDate,
  endedAt: optionalDate,
});

export const RecapSchema = z.object({
  recap: RecapDetailSchema.optional().catch(undefined),
  sections: z.array(RecapSectionSchema).optional().catch([]),
  timelines: z.array(RecapTimelineSchema).optional().catch([]),
  topics: z.array(RecapTopicSchema).optional().catch([]),
});

export const GetRecapResponseSchema = CreateResponseSchema(RecapSchema);

export type RecapData = z.infer<typeof RecapSchema>;

export type AiRecapSection = z.infer<typeof RecapSectionSchema>;
export type AiRecapTimeline = z.infer<typeof RecapTimelineSchema>;
export type AiRecapTopic = z.infer<typeof RecapTopicSchema>;
/** Alias for UI code that historically expected a shaped recap payload. */
export type AiRecapResponse = RecapData;
