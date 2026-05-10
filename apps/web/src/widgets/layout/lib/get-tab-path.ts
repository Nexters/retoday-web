import { NAVIGATION_TAB, type NavigationTabValue } from "@/shared/config";

export function getTabPath(pathname: string): NavigationTabValue {
  if (pathname.startsWith("/ai-recap")) return NAVIGATION_TAB.AI_RECAP;
  if (pathname.startsWith("/settings")) return NAVIGATION_TAB.SETTINGS;
  return NAVIGATION_TAB.ANALYSIS;
}
