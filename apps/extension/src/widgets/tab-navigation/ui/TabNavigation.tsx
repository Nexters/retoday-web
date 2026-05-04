import { useLocale } from "@recap/i18n";

import { GNB_TABS, type NavigationTabValue } from "@/shared/config";
import { GnbTabs, GnbTabsList, GnbTabsTrigger, Header } from "@/shared/ui";
import { useTabNavigationStore } from "@/widgets/tab-navigation/model";

const TabNavigation = () => {
  const { t } = useLocale("landing");

  const activeTab = useTabNavigationStore((state) => state.activeTab);
  const setActiveTab = useTabNavigationStore((state) => state.setActiveTab);

  return (
    <Header>
      <GnbTabs
        value={activeTab}
        className="border-b border-gray-200 w-full"
        onValueChange={(value) => setActiveTab(value as NavigationTabValue)}
      >
        <GnbTabsList>
          {GNB_TABS.map(({ labelKey, value }) => (
            <GnbTabsTrigger
              className="cursor-pointer"
              key={value}
              value={value}
            >
              {t(labelKey)}
            </GnbTabsTrigger>
          ))}
        </GnbTabsList>
      </GnbTabs>
    </Header>
  );
};

export default TabNavigation;
