import { create } from "zustand";

import { NAVIGATION_TAB } from "@/const";

type SettingState = {
  activeTab: string;
  selectedDate: Date;

  setActiveTab: (tab: string) => void;
  setSelectedDate: (date: Date) => void;
};

export const useSettingStore = create<SettingState>((set) => ({
  activeTab: NAVIGATION_TAB.ANALYSIS,
  selectedDate: new Date(),

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
