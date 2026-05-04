import { SIDE_PANEL_SCREEN_MAP } from "@/app/entrypoint/side-panel/Navigation";
import { useAuthStore } from "@/entities/auth/model";
import AuthScreen from "@/screens/auth/ui/AuthScreen";
import { SidePanelFooter, SidePanelLayout } from "@/widgets/layout/ui";
import { useTabNavigationStore } from "@/widgets/tab-navigation/model";
import { TabNavigation } from "@/widgets/tab-navigation/ui";

export function SidePanel() {
  const activeTab = useTabNavigationStore((state) => state.activeTab);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const MainScreen =
    SIDE_PANEL_SCREEN_MAP[activeTab as keyof typeof SIDE_PANEL_SCREEN_MAP];

  return (
    <div className="flex h-full flex-col">
      <TabNavigation />
      <SidePanelLayout>
        {isLoggedIn ? <MainScreen /> : <AuthScreen />}
      </SidePanelLayout>
      <SidePanelFooter />
    </div>
  );
}
