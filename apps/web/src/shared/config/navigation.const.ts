export const NAVIGATION_TAB = {
  ANALYSIS: "analysis",
  AI_RECAP: "ai-recap",
  SETTINGS: "settings",
} as const;

export type NavigationTabValue =
  (typeof NAVIGATION_TAB)[keyof typeof NAVIGATION_TAB];

export type LandingNavigationLabelKey = "analysis" | "aiRecap" | "settings";

export const GNB_TABS: {
  labelKey: LandingNavigationLabelKey;
  value: NavigationTabValue;
  path: string;
}[] = [
  {
    labelKey: "analysis",
    value: "analysis",
    path: "/analysis",
  },
  {
    labelKey: "aiRecap",
    value: "ai-recap",
    path: "/ai-recap",
  },
  {
    labelKey: "settings",
    value: "settings",
    path: "/settings",
  },
];
