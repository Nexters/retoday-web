import { z } from "zod";

export const DateQuerySchema = z.object({
  date: z.string(),
});

export type DateQueryType = z.infer<typeof DateQuerySchema>;
