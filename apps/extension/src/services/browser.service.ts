import { type PageSnapshot, type StorageSession } from "@/types/storage";
import { getStorage, setStorage } from "@/utils/storage";

async function getBrowserSession() {
  const storage = await getStorage(["sessions"]);
  return storage.sessions ?? {};
}

async function getBrowserSessionById(tabId: string) {
  const sessions = await getBrowserSession();
  return { tabId: Number(tabId), ...sessions[tabId] };
}

async function setBrowserSession(sessions: Record<string, StorageSession>) {
  await setStorage({ sessions });
}

async function clearBrowserSession() {
  await setStorage({ sessions: {} });
}

async function deleteBrowserSession(tabId: string) {
  if (!tabId) return;
  const sessions = await getBrowserSession();

  delete sessions[tabId];
  await setBrowserSession(sessions);
}

async function addBrowserSession(tabId: string, data: PageSnapshot) {
  if (!tabId) return;
  const sessions = await getBrowserSession();

  sessions[tabId] = {
    ...data,
    visitedAt: new Date().getTime() / 1000,
    closedAt: null,
  };

  await setBrowserSession(sessions);
}

async function closeBrowserSession() {
  let result: StorageSession | null = null;
  const sessions = await getBrowserSession();

  for (const [tabId, session] of Object.entries(sessions)) {
    if (session.closedAt === null) {
      const closedAt = new Date().getTime() / 1000;
      session.closedAt = closedAt;
      result = {
        ...session,
        tabId: Number(tabId),
        closedAt,
      };
      break;
    }
  }
  await setBrowserSession(sessions);
  return result;
}

async function visitBrowserSession(tabId: string) {
  const sessions = await getBrowserSession();

  if (!sessions[tabId]) return;
  sessions[tabId].visitedAt = new Date().getTime() / 1000;
  sessions[tabId].closedAt = null;
  await setBrowserSession(sessions);
}

export {
  addBrowserSession,
  clearBrowserSession,
  closeBrowserSession,
  deleteBrowserSession,
  getBrowserSession,
  getBrowserSessionById,
  setBrowserSession,
  visitBrowserSession,
};
