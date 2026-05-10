"use client";

import { useLocale } from "@recap/i18n";

import { GNB_TABS } from "@/shared/config";
import { GnbTabs, GnbTabsList, GnbTabsTrigger } from "@/shared/ui";
import { useGnbNavigation } from "@/widgets/layout/model/use-gnb-navigation";

const TabNavigation = () => {
  const { t } = useLocale("landing");
  const { currentTab, onTabChange } = useGnbNavigation();

  return (
    <GnbTabs value={currentTab} onValueChange={onTabChange} className="w-fit">
      <GnbTabsList>
        {GNB_TABS.map(({ labelKey, value }) => (
          <GnbTabsTrigger key={value} value={value}>
            {t(`navigation.${labelKey}`)}
          </GnbTabsTrigger>
        ))}
      </GnbTabsList>
    </GnbTabs>
  );
};

export default TabNavigation;
