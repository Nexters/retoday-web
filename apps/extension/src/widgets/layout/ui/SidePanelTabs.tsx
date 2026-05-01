import { useLocale } from "@recap/i18n";

import { useSettingStore } from "@/app/store/model";
import { GNB_TABS } from "@/shared/config";
import { GnbTabs, GnbTabsList, GnbTabsTrigger, Header } from "@/shared/ui";

const SidePanelTabs = () => {
  const activeTab = useSettingStore((state) => state.activeTab);
  const setActiveTab = useSettingStore((state) => state.setActiveTab);
  const { t } = useLocale("landing");

  return (
    <Header>
      <GnbTabs
        value={activeTab}
        className="border-b border-gray-200 w-full"
        onValueChange={setActiveTab}
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

export default SidePanelTabs;
