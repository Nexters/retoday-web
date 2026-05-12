/**
 * 환경 변수 컨트랙트
 */

import { isValidMeasurementId } from "./sanitize";

export interface AnalyticsCredentials {
  measurementId: string;
  apiSecret: string;
}

export interface ParsedAnalyticsCredentials {
  /** 두 필드 모두 유효한 경우만 truthy. */
  credentials: AnalyticsCredentials | null;
  measurementId: string | null;
  apiSecret: string | null;
}

export function parseAnalyticsCredentials(
  raw: Partial<AnalyticsCredentials>,
): ParsedAnalyticsCredentials {
  const measurementId = isValidMeasurementId(raw.measurementId)
    ? raw.measurementId
    : null;
  const apiSecret =
    typeof raw.apiSecret === "string" && raw.apiSecret.length > 0
      ? raw.apiSecret
      : null;

  return {
    measurementId,
    apiSecret,
    credentials:
      measurementId && apiSecret ? { measurementId, apiSecret } : null,
  };
}
