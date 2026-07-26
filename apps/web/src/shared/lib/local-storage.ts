import { LocalStorageKey } from "./local-storage-key";

const canUseLocalStorage = () => typeof window !== "undefined";

const setItem = <T>(key: LocalStorageKey, items: T): void => {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.log("localstorage error: ", error);
  }
};

const getItemOrNull = <T>(key: LocalStorageKey): T | null => {
  if (!canUseLocalStorage()) return null;

  try {
    const data = window.localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch (error) {
    console.log("localstorage error: ", error);
    return null;
  }
};

// eslint-disable-next-line unused-imports/no-unused-vars
const removeItem = (key: LocalStorageKey): void => {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log("localstorage error: ", error);
  }
};

/** 새로고침 툴팁 첫 노출 여부 */
export const getInitialized = (): boolean => {
  return !!getItemOrNull<boolean>(LocalStorageKey.IsInitialized);
};

export const setInitialized = (value: boolean): void => {
  setItem<boolean>(LocalStorageKey.IsInitialized, value);
};
