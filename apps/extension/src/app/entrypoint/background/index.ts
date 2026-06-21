import browser from "webextension-polyfill";

import { authAPIService } from "@/entities/auth/api";
import type { LoginResponse } from "@/entities/auth/model/auth.type";
import {
  addBrowserSession,
  clearBrowserSession,
  closeBrowserSession,
  deleteBrowserSession,
  getBrowserSession,
  getBrowserSessionById,
  visitBrowserSession,
} from "@/entities/history/model/browser.service";
import browserHistory from "@/entities/history/model/browser-history";
import {
  type ExtensionMessage,
  MESSAGE_TYPE,
} from "@/entities/history/model/messages.type";
import type { StorageSession } from "@/entities/history/model/storage.type";
import analytics from "@/shared/api/google-analytics/google-analytics.service";
import { domainStore } from "@/shared/lib/domain-store";
import { tokenStore } from "@/shared/lib/token-store";

const removedTabIds = new Set<number>();

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error: unknown) => console.error(error));

const TEST_ALARM_NAME = "test-console-log-alarm";

const TARGET_HOUR = 0;
const TARGET_MINUTE = 0;

const getNextAlarmTime = (hour: number, minute: number) => {
  const now = new Date();
  const target = new Date();

  target.setHours(hour, minute, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  return target.getTime();
};

const ensureTestAlarm = async () => {
  await browser.alarms.clear(TEST_ALARM_NAME);

  const scheduledTime = getNextAlarmTime(TARGET_HOUR, TARGET_MINUTE);

  await browser.alarms.create(TEST_ALARM_NAME, {
    when: scheduledTime,
  });
};

const getCurrentActiveTab = async () => {
  const [lastFocusedActiveTab] = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (lastFocusedActiveTab?.id != null) {
    return lastFocusedActiveTab;
  }

  const [anyActiveTab] = await browser.tabs.query({
    active: true,
  });

  return anyActiveTab;
};

const runScheduledSessionRestart = async () => {
  try {
    const activeTab = await getCurrentActiveTab();

    const activeTabId = activeTab?.id;

    if (activeTabId == null) {
      console.warn("[alarm] active tab id not found");
      return;
    }

    const currentSession = await getBrowserSessionById(String(activeTabId));

    if (!currentSession) {
      console.warn("[alarm] current browser session not found", {
        tabId: activeTabId,
      });
      return;
    }

    /**
     * createClosedHistory는 session.closedAt이 있으면 return 하므로
     * closedAt 없는 원본 session으로 호출
     */
    const sessionForClosedHistory = {
      ...currentSession,
      tabId: Number(activeTabId),
    } as StorageSession;

    await browserHistory.createClosedHistory(sessionForClosedHistory);

    /**
     * 실제 현재 session close 처리
     */
    const closedSession = await closeBrowserSession();

    const closedAt = closedSession?.closedAt ?? new Date().getTime() / 1000;

    /**
     * createHistory는 visitedAt, closedAt으로 시간 차이를 계산하므로
     * closedAt이 있는 동일 session을 넘김
     */
    const sessionForHistory = {
      ...currentSession,
      ...(closedSession ?? {}),
      tabId: Number(activeTabId),
      closedAt,
    } as StorageSession;

    await browserHistory.createHistory(sessionForHistory);

    /**
     * 같은 탭을 다시 start 상태로 전환
     */
    await visitBrowserSession(String(activeTabId));
  } catch (error) {
    console.error("[alarm] runScheduledSessionRestart failed", error);
  }
};

browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== TEST_ALARM_NAME) return;

  runScheduledSessionRestart().catch((error) => {
    console.error("[alarm] unhandled restart error", error);
  });
});

void ensureTestAlarm();

browser.runtime.onInstalled.addListener((details) => {
  void analytics.fireEvent("extension_lifecycle", {
    reason: details.reason,
    ...(details.previousVersion != null
      ? { previous_version: details.previousVersion }
      : {}),
  });
});

browser.windows.onRemoved.addListener(async () => {
  getBrowserSession().then((sessions) => {
    Object.entries(sessions).forEach(([tabId, session]) => {
      browserHistory.createClosedHistory({
        ...session,
        tabId: Number(tabId),
      } as StorageSession);
    });
  });
  clearBrowserSession();
});

browser.tabs.onRemoved.addListener(async (tabId) => {
  removedTabIds.add(tabId);
  getBrowserSessionById(String(tabId)).then((session) => {
    if (!session) return;
    browserHistory.createClosedHistory(session as StorageSession);
    deleteBrowserSession(String(tabId));

    // Clean up after a short delay to avoid memory leaks
    setTimeout(() => {
      removedTabIds.delete(tabId);
    }, 1000);
  });
});

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  const closedSession = await closeBrowserSession();
  await visitBrowserSession(String(tabId));
  if (!closedSession) return;
  const excludedDomains = await domainStore.getExcludedDomains();

  if (
    browserHistory.isExcludedDomain(closedSession?.url ?? "", excludedDomains)
  ) {
    return;
  }

  if (!removedTabIds.has(Number(closedSession.tabId))) {
    await browserHistory.createHistory(closedSession as StorageSession);
  }
});

browser.runtime.onMessage.addListener(
  async (message: unknown, sender: browser.Runtime.MessageSender) => {
    const msg = message as ExtensionMessage;

    if (msg.type === MESSAGE_TYPE.PAGE_VISITED) {
      const excludedDomains = await domainStore.getExcludedDomains();

      if (browserHistory.isExcludedDomain(msg.data.url, excludedDomains)) {
        return;
      }

      await addBrowserSession(String(sender.tab?.id ?? ""), msg.data);

      const host = new URL(msg.data.url).host;
      void analytics.fireEvent("content_session_tracked", { host });

      return;
    }

    if (msg.type === MESSAGE_TYPE.GOOGLE_LOGIN) {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        authAPIService
          .googleOauthLogin({
            oAuthToken: token,
            provider: "GOOGLE",
          })
          .then((data: unknown) => {
            tokenStore.set(data as LoginResponse);
            void analytics.fireEvent("login", { method: "google" });
            chrome.runtime.sendMessage({ type: MESSAGE_TYPE.AUTH_CHANGED });
          });
      });
    }

    return;
  },
);
