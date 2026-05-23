import { z } from "zod";

import { CreateResponseSchema, dateStringSchema } from "../../schema";

export const WorkPatternDayEnum = z.enum([
  "DAWN",
  "MORNING",
  "DAYTIME",
  "EVENING",
]);

export type WorkPatternDayType = z.infer<typeof WorkPatternDayEnum>;

const WorkPatternCountSchema = z
  .object({
    DAWN: z.number(),
    MORNING: z.number(),
    DAYTIME: z.number(),
    EVENING: z.number(),
  })
  .partial();

export const GetWorkPatternSchema = z.object({
  date: dateStringSchema,
  counts: WorkPatternCountSchema,
});

export const GetWorkPatternResponseSchema =
  CreateResponseSchema(GetWorkPatternSchema);

export type AnalysisWorkPatternData = z.infer<typeof GetWorkPatternSchema>;
