import { z } from "zod";

export const DateQuerySchema = z.object({
  date: z.string(),
  timeZone: z.string(),
});

export const DateTimeZoneQuerySchema = z.object({
  date: z.string(),
  timeZone: z.string(),
});
export type DateQueryType = z.infer<typeof DateQuerySchema>;
export type DateTimeZoneQueryType = z.infer<typeof DateTimeZoneQuerySchema>;
