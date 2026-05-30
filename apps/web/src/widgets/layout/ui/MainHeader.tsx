"use client";

import { NAVIGATION_TAB } from "@/shared/config";
import { useGnbNavigation } from "@/widgets/layout/model/use-gnb-navigation";

import DateSelector from "./DateSelector";
import RefreshButton from "./RefreshButton";
import TabNavigation from "./TabNavigation";

const MainHeader = () => {
  const { currentTab } = useGnbNavigation();
  const isSettings = currentTab === NAVIGATION_TAB.SETTINGS;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
      <TabNavigation />
      {!isSettings && (
        <div className="ml-auto flex items-center gap-2">
          <RefreshButton />
          <DateSelector />
        </div>
      )}
    </div>
  );
};

export default MainHeader;
