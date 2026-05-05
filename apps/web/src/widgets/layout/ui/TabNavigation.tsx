"use client";

import { GNB_TABS } from "@/shared/config";
import { GnbTabs, GnbTabsList, GnbTabsTrigger } from "@/shared/ui";
import { useGnbNavigation } from "@/widgets/layout/model/use-gnb-navigation";

const TabNavigation = () => {
  const { currentTab, onTabChange } = useGnbNavigation();

  return (
    <GnbTabs value={currentTab} onValueChange={onTabChange} className="w-fit">
      <GnbTabsList>
        {GNB_TABS.map(({ label, value }) => (
          <GnbTabsTrigger key={value} value={value}>
            {label}
          </GnbTabsTrigger>
        ))}
      </GnbTabsList>
    </GnbTabs>
  );
};

export default TabNavigation;
