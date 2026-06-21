import type { LanguageSchemaType } from "@recap/api";
import type { LanguageType } from "@recap/i18n";
import { Language } from "@recap/lib";

export const LANGUAGE_MAP: Record<LanguageSchemaType, LanguageType> = {
  [Language.KOREAN]: "ko",
  [Language.ENGLISH]: "en",
};
