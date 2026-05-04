export const DATE_FORMAT = {
  YYYY_MM_DD: "YYYY.MM.DD",
  YYYY_MM_DD_DASH: "YYYY-MM-DD",
  YYYY_MM_DD_SLASH: "YYYY/MM/DD",
  MM_DD: "MM.DD",
  YYYY_MM: "YYYY.MM",
} as const;

export type DateFormat = (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT];
