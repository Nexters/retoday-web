import type { AnalyticsEventMap } from "@recap/analytics";
import { pageLocationOriginOnly } from "@recap/analytics";

export function buildPageViewParams(
  pathname: string,
  search: string,
): AnalyticsEventMap["page_view"] {
  const pagePath = search ? `${pathname}?${search}` : pathname;
  const href =
    typeof window !== "undefined"
      ? window.location.href
      : `https://localhost${pagePath}`;

  return {
    page_title: typeof document !== "undefined" ? (document.title ?? "") : "",
    page_location: pageLocationOriginOnly(href),
    page_path: pagePath,
  };
}
