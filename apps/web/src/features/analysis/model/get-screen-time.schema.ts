import { CreateResponseSchema, dateStringSchema } from "@recap/api";
import { z } from "zod";

const ScreenTimePeriodEnum = z.enum(["DAILY", "WEEKLY"]);

export type ScreenTimePeriodType = z.infer<typeof ScreenTimePeriodEnum>;

const ScreenTimeSchema = z.object({
  startedAt: dateStringSchema,
  endedAt: dateStringSchema,
  stayDuration: z.number(),
});

export type ScreenTimeType = z.infer<typeof ScreenTimeSchema>;

const GetScreenTimeSchema = z.object({
  period: ScreenTimePeriodEnum,
  startedAt: dateStringSchema,
  endedAt: dateStringSchema,
  totalStayDuration: z.number(),
  screenTimes: z.array(ScreenTimeSchema),
});

export const GetScreenTimeResponseSchema =
  CreateResponseSchema(GetScreenTimeSchema);

export const GetScreenTimeQuerySchema = z.object({
  date: z.string(),
  period: ScreenTimePeriodEnum,
});

export type GetScreenTimeQueryType = z.infer<typeof GetScreenTimeQuerySchema>;
