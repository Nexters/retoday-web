export const NAVIGATION_TAB = {
  ANALYSIS: "analysis",
  AI_RECAP: "ai-recap",
  SETTINGS: "settings",
} as const;

export type NavigationTabValue =
  (typeof NAVIGATION_TAB)[keyof typeof NAVIGATION_TAB];

export const GNB_TABS: {
  labelKey:
    | "navigation.analysis"
    | "navigation.aiRecap"
    | "navigation.settings";
  value: NavigationTabValue;
  path: string;
}[] = [
  {
    labelKey: "navigation.analysis",
    value: "analysis",
    path: "/analysis",
  },
  {
    labelKey: "navigation.aiRecap",
    value: "ai-recap",
    path: "/ai-recap",
  },
  {
    labelKey: "navigation.settings",
    value: "settings",
    path: "/settings",
  },
] as const;
