import { create } from "zustand";

import { NAVIGATION_TAB, type NavigationTabValue } from "@/shared/config";

type TabNavigationState = {
  activeTab: NavigationTabValue;
  setActiveTab: (tab: NavigationTabValue) => void;
};

export const useTabNavigationStore = create<TabNavigationState>((set) => ({
  activeTab: NAVIGATION_TAB.ANALYSIS,
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
