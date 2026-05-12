/**
 * GA4 Measurement Protocol payload / URL 빌더.
 */

import type { AnalyticsParams } from "./events";

export const GA_MP_ENDPOINT = "https://www.google-analytics.com/mp/collect";
export const GA_MP_DEBUG_ENDPOINT =
  "https://www.google-analytics.com/debug/mp/collect";

export const DEFAULT_ENGAGEMENT_TIME_MSEC = 100;

export interface MeasurementProtocolEvent {
  name: string;
  params: AnalyticsParams;
}

export interface MeasurementProtocolPayload {
  client_id: string;
  user_id?: string;
  events: MeasurementProtocolEvent[];
}

export interface BuildRequestUrlOptions {
  measurementId: string;
  apiSecret: string;
  debug?: boolean;
}

export function buildRequestUrl({
  measurementId,
  apiSecret,
  debug = false,
}: BuildRequestUrlOptions): string {
  const base = debug ? GA_MP_DEBUG_ENDPOINT : GA_MP_ENDPOINT;
  const search = new URLSearchParams({
    measurement_id: measurementId,
    api_secret: apiSecret,
  });
  return `${base}?${search.toString()}`;
}

export interface BuildEventPayloadOptions {
  clientId: string;
  userId?: string | null;
  sessionId?: string;
  engagementTimeMsec?: number;
  name: string;
  params: AnalyticsParams;
}

export function buildEventPayload({
  clientId,
  userId,
  sessionId,
  engagementTimeMsec = DEFAULT_ENGAGEMENT_TIME_MSEC,
  name,
  params,
}: BuildEventPayloadOptions): MeasurementProtocolPayload {
  const eventParams: AnalyticsParams = { ...params };

  if (sessionId && eventParams.session_id === undefined) {
    eventParams.session_id = sessionId;
  }
  if (eventParams.engagement_time_msec === undefined) {
    eventParams.engagement_time_msec = engagementTimeMsec;
  }

  const payload: MeasurementProtocolPayload = {
    client_id: clientId,
    events: [{ name, params: eventParams }],
  };

  if (userId) {
    payload.user_id = userId;
  }

  return payload;
}
