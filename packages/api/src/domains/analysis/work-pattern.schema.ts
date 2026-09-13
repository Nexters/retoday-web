import { z } from "zod";

export const WorkPatternDayEnum = z.enum([
  "DAWN",
  "MORNING",
  "DAYTIME",
  "EVENING",
]);

export type WorkPatternDayType = z.infer<typeof WorkPatternDayEnum>;

export const WorkPatternHourCountSchema = z.object({
  hour: z.number().int().min(0).max(23),
  count: z.number(),
});

export type WorkPatternHourCount = z.infer<typeof WorkPatternHourCountSchema>;

export const GetWorkPatternSchema = z.object({
  counts: z.array(WorkPatternHourCountSchema),
});

export type AnalysisWorkPatternData = z.infer<typeof GetWorkPatternSchema>;
