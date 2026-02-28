export const NAVIGATION_TAB = {
  ANALYSIS: "analysis",
  AI_RECAP: "ai-recap",
  SETTINGS: "settings",
} as const;

export type NavigationTabValue =
  (typeof NAVIGATION_TAB)[keyof typeof NAVIGATION_TAB];

export const GNB_TABS: {
  label: string;
  value: NavigationTabValue;
  path: string;
}[] = [
  {
    label: "분석",
    value: "analysis",
    path: "/analysis",
  },
  {
    label: "AI 리캡",
    value: "ai-recap",
    path: "/ai-recap",
  },
  {
    label: "설정",
    value: "settings",
    path: "/settings",
  },
] as const;
