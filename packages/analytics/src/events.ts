/**
 * GA4에 보내는 이벤트의 단일 카탈로그
 */

export type AnalyticsParamPrimitive = string | number | boolean;
export type AnalyticsParamValue = AnalyticsParamPrimitive | undefined;
export type AnalyticsParams = Record<string, AnalyticsParamValue>;

export type AnalyticsPlatform = "web" | "extension";

export interface AnalyticsBaseParams extends AnalyticsParams {
  platform: AnalyticsPlatform;
  app_version?: string;
  locale?: string;
}

export interface AnalyticsEventMap {
  page_view: {
    page_title: string;
    page_location: string;
    page_path?: string;
    page_referrer?: string;
  };

  login: {
    method: "google";
  };

  logout: Record<string, never>;

  sign_up: {
    method: "google";
  };

  extension_lifecycle: {
    reason: string;
    previous_version?: string;
  };

  extension_error: {
    code?: string;
    message?: string;
    where?: string;
  };

  web_error: {
    code?: string;
    message?: string;
    where?: string;
  };

  content_session_tracked: {
    host: string;
  };

  recap_generated: {
    source: AnalyticsPlatform;
    duration_ms?: number;
  };
}

export type AnalyticsEventName = keyof AnalyticsEventMap;

export type AnalyticsTrackEventName = Exclude<AnalyticsEventName, "page_view">;

export type AnalyticsEventParams<E extends AnalyticsEventName> =
  AnalyticsEventMap[E];
