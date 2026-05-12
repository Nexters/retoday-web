"use client";

import { useContext } from "react";
import type { AnalyticsClient } from "@recap/analytics";

import { AnalyticsContext } from "./analytics-context";

export function useAnalytics(): AnalyticsClient {
  return useContext(AnalyticsContext);
}
