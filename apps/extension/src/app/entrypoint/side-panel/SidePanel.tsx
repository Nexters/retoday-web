import { SIDE_PANEL_SCREEN_MAP } from "@/app/entrypoint/side-panel/Navigation";
import { useAuthStore, useSettingStore } from "@/app/store/model";
import AuthScreen from "@/screens/auth/ui/AuthScreen";
import {
  SidePanelFooter,
  SidePanelLayout,
  SidePanelTabs,
} from "@/widgets/layout/ui";

export function SidePanel() {
  const activeTab = useSettingStore((state) => state.activeTab);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const MainScreen =
    SIDE_PANEL_SCREEN_MAP[activeTab as keyof typeof SIDE_PANEL_SCREEN_MAP];

  return (
    <div className="flex h-full flex-col">
      <SidePanelTabs />
      <SidePanelLayout>
        {isLoggedIn ? <MainScreen /> : <AuthScreen />}
      </SidePanelLayout>
      <SidePanelFooter />
    </div>
  );
}
