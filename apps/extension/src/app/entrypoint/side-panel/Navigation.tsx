import { AiRecapScreen } from "@/screens/ai-recap/ui";
import { AnalysisScreen } from "@/screens/analysis/ui";
import { SettingScreen } from "@/screens/setting/ui";
import { NAVIGATION_TAB } from "@/shared/config/navigation.const";

export const SIDE_PANEL_SCREEN_MAP = {
  [NAVIGATION_TAB.ANALYSIS]: AnalysisScreen,
  [NAVIGATION_TAB.AI_RECAP]: AiRecapScreen,
  [NAVIGATION_TAB.SETTINGS]: SettingScreen,
} as const;
