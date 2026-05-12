import type {
  AnalyticsBaseParams,
  AnalyticsEventMap,
  AnalyticsParams,
  AnalyticsPlatform,
  AnalyticsTrackEventName,
} from "./events";

export interface AnalyticsClient {
  readonly platform: AnalyticsPlatform;

  identify(
    userId: string | null,
    traits?: AnalyticsParams,
  ): void | Promise<void>;

  track<E extends AnalyticsTrackEventName>(
    name: E,
    params: AnalyticsEventMap[E],
  ): void | Promise<void>;

  pageView(params: AnalyticsEventMap["page_view"]): void | Promise<void>;
}

export function createNoopAnalytics(
  platform: AnalyticsPlatform = "web",
): AnalyticsClient {
  return {
    platform,
    identify: () => {},
    track: () => {},
    pageView: () => {},
  };
}

export const noopAnalytics: AnalyticsClient = createNoopAnalytics("web");

export function createParamsEnricher(
  getBase: () => Partial<AnalyticsBaseParams>,
) {
  return <P extends AnalyticsParams>(
    params: P,
  ): P & Partial<AnalyticsBaseParams> => {
    return { ...params, ...getBase() };
  };
}
