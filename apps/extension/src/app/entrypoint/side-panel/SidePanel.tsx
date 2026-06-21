import { SIDE_PANEL_SCREEN_MAP } from "@/app/entrypoint/side-panel/Navigation";
import { AuthConsumer } from "@/entities/auth/ui";
import AuthScreen from "@/screens/auth/ui/AuthScreen";
import { SidePanelFooter, SidePanelLayout } from "@/widgets/layout/ui";
import { useTabNavigationStore } from "@/widgets/tab-navigation/model";
import { TabNavigation } from "@/widgets/tab-navigation/ui";

export function SidePanel() {
  const activeTab = useTabNavigationStore((state) => state.activeTab);
  const MainScreen =
    SIDE_PANEL_SCREEN_MAP[activeTab as keyof typeof SIDE_PANEL_SCREEN_MAP];

  return (
    <AuthConsumer>
      {({ isReady, isLoggedIn }) => (
        <div className="flex h-full min-h-0 flex-col">
          <TabNavigation />
          <SidePanelLayout>
            {!isReady ? (
              <AuthScreen />
            ) : isLoggedIn ? (
              <MainScreen />
            ) : (
              <AuthScreen />
            )}
          </SidePanelLayout>
          <SidePanelFooter />
        </div>
      )}
    </AuthConsumer>
  );
}
