import { z } from "zod";

import {
  CreateResponseSchema,
  dateStringSchema,
  isoDurationStringSchema,
} from "../../schema";

const ScreenTimePeriodEnum = z.enum(["DAILY", "WEEKLY"]);

export type ScreenTimePeriodType = z.infer<typeof ScreenTimePeriodEnum>;

const ScreenTimeSchema = z.object({
  startedAt: dateStringSchema,
  endedAt: dateStringSchema,
  stayDuration: isoDurationStringSchema,
});

export type ScreenTimeType = z.infer<typeof ScreenTimeSchema>;

export const GetScreenTimeSchema = z.object({
  totalStayDuration: isoDurationStringSchema,
  screenTimes: z.array(ScreenTimeSchema),
});

export const GetScreenTimeResponseSchema =
  CreateResponseSchema(GetScreenTimeSchema);

export const GetScreenTimeQuerySchema = z.object({
  date: z.string(),
  period: ScreenTimePeriodEnum,
  timeZone: z.string(),
});

export type GetScreenTimeQueryType = z.infer<typeof GetScreenTimeQuerySchema>;

export type AnalysisScreenTimeData = z.infer<typeof GetScreenTimeSchema>;
