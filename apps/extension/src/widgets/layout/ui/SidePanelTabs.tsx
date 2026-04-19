import { useSettingStore } from "@/app/store/model";
import { GNB_TABS } from "@/shared/config";
import { GnbTabs, GnbTabsList, GnbTabsTrigger, Header } from "@/shared/ui";

const SidePanelTabs = () => {
  const activeTab = useSettingStore((state) => state.activeTab);
  const setActiveTab = useSettingStore((state) => state.setActiveTab);

  return (
    <Header>
      <GnbTabs
        value={activeTab}
        className="border-b border-gray-200 w-full"
        onValueChange={setActiveTab}
      >
        <GnbTabsList>
          {GNB_TABS.map(({ label, value }) => (
            <GnbTabsTrigger
              className="cursor-pointer"
              key={value}
              value={value}
            >
              {label}
            </GnbTabsTrigger>
          ))}
        </GnbTabsList>
      </GnbTabs>
    </Header>
  );
};

export default SidePanelTabs;
