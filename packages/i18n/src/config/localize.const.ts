export const LanguageList = {
  EN: "en",
  KO: "ko",
  JA: "ja",
} as const;

export type LanguageType = (typeof LanguageList)[keyof typeof LanguageList];

export const SUPPORTED_LANGUAGES = Object.values(
  LanguageList,
) as LanguageType[];

export const DEFAULT_LANGUAGE: LanguageType = LanguageList.KO;
