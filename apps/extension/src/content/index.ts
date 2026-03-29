import { getPageSnapshot } from "@/content/get-page-metrics";
import analytics from "@/services/google-analytics.service";
import { type PageVisitedMessage } from "@/types/messages";

/** GA page_location용 — 경로·쿼리 제외로 PII 노출 최소화 */
function pageLocationOriginOnly(href: string): string {
  try {
    const u = new URL(href);
    return `${u.protocol}//${u.host}/`;
  } catch {
    return "unknown";
  }
}

function sendPageVisited() {
  const pageData = getPageSnapshot();

  void analytics.firePageViewEvent(
    document.title || "(no title)",
    pageLocationOriginOnly(window.location.href),
  );

  const message: PageVisitedMessage = {
    type: "PAGE_VISITED",
    data: pageData,
  };

  chrome.runtime.sendMessage(message).catch((error) => {
    if (!error.message?.includes("message port closed")) {
      console.error("Failed to send message:", error);
    }
  });
}

function init() {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    sendPageVisited();
  } else {
    document.addEventListener("DOMContentLoaded", sendPageVisited);
  }
}

init();
