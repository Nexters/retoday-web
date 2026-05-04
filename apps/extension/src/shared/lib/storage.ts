import browser from "webextension-polyfill";

import {
  defaultStorage,
  type StorageData,
} from "@/entities/history/model/storage.type";

export async function getStorage<K extends keyof StorageData>(
  keys: K[],
): Promise<Pick<StorageData, K>> {
  const result = await browser.storage.sync.get(keys);

  const data: Partial<StorageData> = {};
  for (const key of keys) {
    data[key] = result[key] ?? defaultStorage[key];
  }

  return data as Pick<StorageData, K>;
}

export async function setStorage(data: Partial<StorageData>): Promise<void> {
  await browser.storage.sync.set(data);
}

export async function clearStorage(): Promise<void> {
  await browser.storage.sync.clear();
}
