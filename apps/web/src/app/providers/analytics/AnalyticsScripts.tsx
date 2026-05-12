import { GoogleAnalytics } from "@next/third-parties/google";

import { analyticsMeasurementId } from "@/shared/lib/analytics";

function AnalyticsScripts() {
  const enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "false";

  if (!analyticsMeasurementId || !enabled) {
    return null;
  }

  return <GoogleAnalytics gaId={analyticsMeasurementId} />;
}

export default AnalyticsScripts;
