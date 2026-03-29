import { useEffect, useRef } from "react";

import { Content } from "@/components";
import { NAVIGATION_TAB } from "@/const/navigation.const";
import { AiRecapView } from "@/features/ai-recap/components";
import { AnalysisView } from "@/features/analysis/components";
import { AuthGuard } from "@/features/auth/components";
import { SettingView } from "@/features/setting/components";
import analytics from "@/services/google-analytics.service";
import { useSettingStore } from "@/stores";
import { PageFooter, PageHeader } from "@/widgets";

export function SidePanel() {
  const activeTab = useSettingStore((state) => state.activeTab);

  const hasLoggedPanelOpen = useRef(false);

  useEffect(() => {
    if (hasLoggedPanelOpen.current) return;
    hasLoggedPanelOpen.current = true;
    void analytics.firePageViewEvent(
      "Retoday Side Panel",
      typeof window !== "undefined" ? window.location.href : "",
    );
  }, []);

  useEffect(() => {
    void analytics.fireEvent("side_panel_tab_view", { tab: activeTab });
  }, [activeTab]);

  return (
    <div className="flex h-full flex-col">
      <AuthGuard>
        <PageHeader />

        <Content
          className={activeTab === NAVIGATION_TAB.SETTINGS ? "pt-12" : ""}
        >
          {activeTab === NAVIGATION_TAB.ANALYSIS && <AnalysisView />}
          {activeTab === NAVIGATION_TAB.AI_RECAP && <AiRecapView />}
          {activeTab === NAVIGATION_TAB.SETTINGS && <SettingView />}
        </Content>
      </AuthGuard>
      <PageFooter />
    </div>
  );
}
