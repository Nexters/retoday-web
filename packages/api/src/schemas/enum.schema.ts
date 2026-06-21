import { Language, SERVER_TIMEZONE } from "@recap/lib";
import { z } from "zod";

export const LanguageSchema = z.enum([Language.KOREAN, Language.ENGLISH]);

export type LanguageSchemaType = z.infer<typeof LanguageSchema>;

export const TimeZoneSchema = z.enum([
  SERVER_TIMEZONE.SEOUL,
  SERVER_TIMEZONE.UTC,
]);

export type TimeZoneSchemaType = z.infer<typeof TimeZoneSchema>;

export const DateQuerySchema = z.object({
  date: z.string(),
});

export const DateTimeZoneQuerySchema = z.object({
  date: z.string(),
  timeZone: TimeZoneSchema,
});

export type DateQueryType = z.infer<typeof DateQuerySchema>;
export type DateTimeZoneQueryType = z.infer<typeof DateTimeZoneQuerySchema>;
