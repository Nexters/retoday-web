import browser from "webextension-polyfill";

import { authAPIService } from "@/entities/auth/api";
import type { BackendLoginResponse } from "@/entities/auth/model/auth.type";
import { historyAPIService } from "@/entities/history/api";
import type { CreateHistoryDTO } from "@/entities/history/model/history.type";
import { tokenStore } from "@/lib/token-store";
import {
  addBrowserSession,
  closeBrowserSession,
  deleteBrowserSession,
  getBrowserSessionById,
  visitBrowserSession,
} from "@/services/browser.service";
import { calculateTimeDiff } from "@/utils/date";

import { type ExtensionMessage, MESSAGE_TYPE } from "../types/messages";

const removedTabIds = new Set<number>();

browser.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    if (chrome?.sidePanel) {
      await chrome.sidePanel.open({ tabId: tab.id });
    }
  }
});

browser.tabs.onRemoved.addListener(async (tabId) => {
  removedTabIds.add(tabId);
  getBrowserSessionById(String(tabId)).then((session) => {
    if (calculateTimeDiff(session.visitedAt, session.closedAt) <= 10) {
      return;
    }

    historyAPIService.createHistory({
      ...session,
      closedAt: session?.closedAt ?? new Date().getTime() / 1000,
      isClosed: true,
    } as CreateHistoryDTO);
    deleteBrowserSession(String(tabId));

    // Clean up after a short delay to avoid memory leaks
    setTimeout(() => {
      removedTabIds.delete(tabId);
    }, 1000);
  });
});

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  const closedSession = await closeBrowserSession();
  console.log("onActivated", closedSession);
  if (closedSession && !removedTabIds.has(Number(closedSession.tabId))) {
    if (
      calculateTimeDiff(closedSession.visitedAt, closedSession.closedAt) <= 10
    ) {
      return;
    }
    console.log("createHistory");
    historyAPIService.createHistory({
      ...closedSession,
      isClosed: false,
    } as CreateHistoryDTO);
  }

  await visitBrowserSession(String(tabId));
});

browser.runtime.onMessage.addListener(
  (
    message: unknown,
    sender: browser.Runtime.MessageSender,
  ): Promise<unknown> | void => {
    const msg = message as ExtensionMessage;

    if (msg.type === MESSAGE_TYPE.PAGE_VISITED) {
      return addBrowserSession(String(sender.tab?.id ?? ""), msg.data);
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
            chrome.runtime.sendMessage({ type: MESSAGE_TYPE.AUTH_CHANGED });
          });
      });
    }

    return;
  },
);
