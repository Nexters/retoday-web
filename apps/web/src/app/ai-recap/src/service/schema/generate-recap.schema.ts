import { CreateResponseSchema, dateStringSchema } from "@recap/api";
import { z } from "zod";

const RecapSectionSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const RecapTimelineSchema = z.object({
  startedAt: dateStringSchema,
  endedAt: dateStringSchema,
  title: z.string(),
  durationMinutes: z.number(),
});

const RecapTopicSchema = z.object({
  keyword: z.string(),
  title: z.string(),
  content: z.string(),
});

const RecapSchema = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  recapDate: z.string().optional(),
  title: z.string().optional(),
  summary: z.string().optional(),
  startedAt: dateStringSchema.optional(),
  closedAt: dateStringSchema.optional(),
  sections: z.array(RecapSectionSchema).optional(),
  timelines: z.array(RecapTimelineSchema).optional(),
  topics: z.array(RecapTopicSchema).optional(),
});

export const GetRecapResponseSchema = CreateResponseSchema(RecapSchema);
