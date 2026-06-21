import type { LanguageSchemaType, TimeZoneSchemaType } from "@recap/api";
import type { LanguageType } from "@recap/i18n";
import { Language, SERVER_TIMEZONE } from "@recap/lib";

export const LANGUAGE_TO_PROFILE: Record<
  LanguageType,
  { language: LanguageSchemaType; timeZone: TimeZoneSchemaType }
> = {
  ko: { language: Language.KOREAN, timeZone: SERVER_TIMEZONE.SEOUL },
  en: { language: Language.ENGLISH, timeZone: SERVER_TIMEZONE.UTC },
};
