"use client";

import { NAVIGATION_TAB } from "@/shared/config";
import { useGnbRoute } from "@/widgets/layout/model/use-gnb-route";

import DateSelector from "./DateSelector";
import FeedbackButton from "./FeedbackButton";
import RefreshButton from "./RefreshButton";
import TabNavigation from "./TabNavigation";

const MainHeader = () => {
  const { tab } = useGnbRoute();
  const isSettings = tab === NAVIGATION_TAB.SETTINGS;

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
