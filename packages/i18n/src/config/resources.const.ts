import enAiRecap from "../locales/en/ai-recap.json";
import enAnalysis from "../locales/en/analysis.json";
import enLanding from "../locales/en/landing.json";
import enSettings from "../locales/en/setting.json";
import jaAiRecap from "../locales/ja/ai-recap.json";
import jaAnalysis from "../locales/ja/analysis.json";
import jaLanding from "../locales/ja/landing.json";
import jaSettings from "../locales/ja/setting.json";
import koAiRecap from "../locales/ko/ai-recap.json";
import koAnalysis from "../locales/ko/analysis.json";
import koLanding from "../locales/ko/landing.json";
import koSettings from "../locales/ko/setting.json";

export const NAMESPACES = {
  AI_RECAP: "ai-recap",
  ANALYSIS: "analysis",
  LANDING: "landing",
  SETTINGS: "settings",
} as const;

export type Namespace = (typeof NAMESPACES)[keyof typeof NAMESPACES];

export const DEFAULT_NAMESPACE: Namespace = NAMESPACES.LANDING;

export const resources = {
  en: {
    [NAMESPACES.AI_RECAP]: enAiRecap,
    [NAMESPACES.ANALYSIS]: enAnalysis,
    [NAMESPACES.LANDING]: enLanding,
    [NAMESPACES.SETTINGS]: enSettings,
  },
  ko: {
    [NAMESPACES.AI_RECAP]: koAiRecap,
    [NAMESPACES.ANALYSIS]: koAnalysis,
    [NAMESPACES.LANDING]: koLanding,
    [NAMESPACES.SETTINGS]: koSettings,
  },
  ja: {
    [NAMESPACES.AI_RECAP]: jaAiRecap,
    [NAMESPACES.ANALYSIS]: jaAnalysis,
    [NAMESPACES.LANDING]: jaLanding,
    [NAMESPACES.SETTINGS]: jaSettings,
  },
} as const;

export type Resources = (typeof resources)[keyof typeof resources];
