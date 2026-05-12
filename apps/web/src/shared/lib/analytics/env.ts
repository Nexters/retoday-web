import { parseAnalyticsCredentials } from "@recap/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const apiSecret = process.env.NEXT_PUBLIC_GA_API_SECRET;

export const analyticsEnv = parseAnalyticsCredentials({
  measurementId,
  apiSecret,
});

export const analyticsMeasurementId = analyticsEnv.measurementId;
