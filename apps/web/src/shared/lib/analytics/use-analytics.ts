"use client";

import { useContext, useMemo } from "react";
import type {
  AnalyticsClient,
  AnalyticsEventMap,
  AnalyticsTrackEventName,
} from "@recap/analytics";
import { createParamsEnricher } from "@recap/analytics";

import { useLanguageStore } from "@/entities/language";

import { AnalyticsContext } from "./analytics-context";

const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "0.1.0";

export function useAnalytics(): AnalyticsClient {
  const client = useContext(AnalyticsContext);
  const locale = useLanguageStore((s) => s.localize);

  return useMemo(() => {
    const enrich = createParamsEnricher(() => ({
      platform: "web" as const,
      app_version: APP_VERSION,
      locale,
    }));

    return {
      platform: client.platform,

      identify(userId, traits) {
        return client.identify(userId, traits ? enrich(traits) : undefined);
      },

      track<E extends AnalyticsTrackEventName>(
        name: E,
        params: AnalyticsEventMap[E],
      ) {
        return client.track(name, enrich(params));
      },

      pageView(params: AnalyticsEventMap["page_view"]) {
        return client.pageView(enrich(params));
      },
    } satisfies AnalyticsClient;
  }, [client, locale]);
}
