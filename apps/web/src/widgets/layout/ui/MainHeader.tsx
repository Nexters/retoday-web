"use client";

import FeedbackButton from "@/features/feedback/ui/FeedbackButton";
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
      <div className="ml-auto flex items-center gap-2">
        {!isSettings && (
          <>
            <RefreshButton />
            <DateSelector />
          </>
        )}
        <FeedbackButton />
      </div>
    </div>
  );
};

export default MainHeader;
