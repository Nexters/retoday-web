export const NAVIGATION_TAB = {
  ANALYSIS: "analysis",
  AI_RECAP: "ai-recap",
  SETTINGS: "settings",
} as const;

export type NavigationTabValue =
  (typeof NAVIGATION_TAB)[keyof typeof NAVIGATION_TAB];

export const GNB_TABS: { label: string; value: NavigationTabValue }[] = [
  {
    label: "분석",
    value: "analysis",
  },
  {
    label: "AI 리캡",
    value: "ai-recap",
  },
  {
    label: "설정",
    value: "settings",
  },
] as const;
