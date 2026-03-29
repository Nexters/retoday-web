import browser from "webextension-polyfill";

import browserHistory from "@/background/browser-history";
import { authAPIService } from "@/entities/auth/api";
import type { BackendLoginResponse } from "@/entities/auth/model/auth.type";
import { domainStore } from "@/lib/domain-store";
import { tokenStore } from "@/lib/token-store";
import {
  addBrowserSession,
  clearBrowserSession,
  closeBrowserSession,
  deleteBrowserSession,
  getBrowserSession,
  getBrowserSessionById,
  visitBrowserSession,
} from "@/services/browser.service";
import analytics from "@/services/google-analytics.service";
import type { StorageSession } from "@/types/storage";

import { type ExtensionMessage, MESSAGE_TYPE } from "../types/messages";

const removedTabIds = new Set<number>();

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error: unknown) => console.error(error));

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
    browserHistory.createHistory(closedSession as StorageSession);
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
      try {
        const host = new URL(msg.data.url).host;
        void analytics.fireEvent("content_session_tracked", { host });
      } catch {
        /* invalid URL — skip GA */
      }
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
            tokenStore.set(data as BackendLoginResponse);
            void analytics.fireEvent("login", { method: "google" });
            chrome.runtime.sendMessage({ type: MESSAGE_TYPE.AUTH_CHANGED });
          });
      });
    }

    return;
  },
);
