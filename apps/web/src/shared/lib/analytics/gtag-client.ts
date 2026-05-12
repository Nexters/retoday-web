import type {
  AnalyticsClient,
  AnalyticsEventMap,
  AnalyticsEventName,
  AnalyticsParams,
} from "@recap/analytics";

import { isDev } from "@/shared/config";
import { isBrowser } from "@/shared/lib/browser";

import { analyticsMeasurementId } from "./env";

function send(command: string, ...args: unknown[]): void {
  if (!analyticsMeasurementId) return;
  if (!isBrowser()) return;

  if (isDev) {
    console.groupCollapsed(`[analytics] gtag(${command})`);
    console.log(args);
    console.groupEnd();
    return;
  }

  window.gtag?.(command, ...args);
}

export const gtagAnalytics: AnalyticsClient = {
  platform: "web",

  identify(userId, traits) {
    if (!analyticsMeasurementId) return;
    const config: AnalyticsParams = { ...traits };
    if (userId !== null && userId !== undefined) {
      config.user_id = userId;
    }
    send("config", analyticsMeasurementId, config);
  },

  track<E extends AnalyticsEventName>(name: E, params: AnalyticsEventMap[E]) {
    send("event", name, params);
  },

  pageView(params) {
    send("event", "page_view", params);
  },
};
