import { DEFAULT_LANGUAGE, type LanguageType } from "@recap/i18n";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ localize: state.localize }),
    },
  ),
);
