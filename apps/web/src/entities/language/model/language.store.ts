import { DEFAULT_LANGUAGE, type LanguageType } from "@recap/i18n";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export interface LanguageState {
  localize: LanguageType;
}

export const initialLanguageState: LanguageState = {
  localize: DEFAULT_LANGUAGE,
};

type LanguageActions = {
  setLanguage: (payload: LanguageType) => void;
};

export type LanguageStoreSchema = LanguageState & LanguageActions;

export const useLanguageStore = create<LanguageStoreSchema>()(
  persist(
    (set) => ({
      ...initialLanguageState,
      setLanguage: (payload) => set({ localize: payload }),
    }),
    {
      name: "recap-language-picker",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : noopStorage,
      ),
      partialize: (state) => ({ localize: state.localize }),
    },
  ),
);
