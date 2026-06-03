"use client";

import { type ReactNode, Suspense, useMemo } from "react";
import type { AnalyticsClient } from "@recap/analytics";

import { AnalyticsContext, gtagAnalytics } from "@/shared/lib/analytics";

import AnalyticsPageTracker from "./AnalyticsPageTracker";

const AnalyticsProvider = ({
  children,
  client,
}: {
  children: ReactNode;
  client?: AnalyticsClient;
}) => {
  const value = useMemo(() => client ?? gtagAnalytics, [client]);

  return (
    <AnalyticsContext.Provider value={value}>
      <Suspense fallback={null}>
        <AnalyticsPageTracker />
      </Suspense>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;
