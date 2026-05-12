"use client";

import { type ReactNode, useMemo } from "react";
import type { AnalyticsClient } from "@recap/analytics";

import { AnalyticsContext, gtagAnalytics } from "@/shared/lib/analytics";

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
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;
