"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { buildPageViewParams, useAnalytics } from "@/shared/lib/analytics";

function AnalyticsPageTracker() {
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const { pageView } = useAnalytics();

  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    const search = searchParams?.toString() ?? "";
    const pathKey = search ? `${pathname}?${search}` : pathname;

    if (lastPathRef.current === pathKey) return;
    lastPathRef.current = pathKey;

    pageView(buildPageViewParams(pathname, search));
  }, [pathname, searchParams]);

  return null;
}

export default AnalyticsPageTracker;
