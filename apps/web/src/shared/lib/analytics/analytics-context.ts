"use client";

import { createContext } from "react";
import type { AnalyticsClient } from "@recap/analytics";
import { createNoopAnalytics } from "@recap/analytics";

export const AnalyticsContext = createContext<AnalyticsClient>(
  createNoopAnalytics("web"),
);
