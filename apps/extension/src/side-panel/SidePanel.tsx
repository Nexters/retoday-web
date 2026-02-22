import { useState } from "react";

import DatePicker from "@/components/DatePicker";
import { NAVIGATION_TAB } from "@/const/navigation.const";
import AnalysisView from "@/features/analysis/components/AnalysisView";
import AuthGuard from "@/features/auth/components/AuthGuard";
import Footer from "@/features/layout/components/Footer";
import NavigationTabs from "@/features/layout/components/NavigationTabs";
import PageContent from "@/features/layout/components/PageContent";
import PageHeader from "@/features/layout/components/PageHeader";
import SettingView from "@/features/setting/components/SettingView";

export function SidePanel() {
  const [activeTab, setActiveTab] = useState<string>(NAVIGATION_TAB.ANALYSIS);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  return (
    <div className="flex h-full flex-col">
      <AuthGuard>
        <PageHeader>
          <NavigationTabs value={activeTab} onValueChange={setActiveTab} />
          {activeTab !== NAVIGATION_TAB.SETTINGS && (
            <DatePicker
              value={selectedDate ?? new Date()}
              onChange={setSelectedDate}
            />
          )}
        </PageHeader>

        <PageContent
          className={activeTab === NAVIGATION_TAB.SETTINGS ? "pt-12" : ""}
        >
          {activeTab === NAVIGATION_TAB.ANALYSIS && (
            <AnalysisView selectedDate={selectedDate ?? new Date()} />
          )}
          {/* {activeTab === NAVIGATION_TAB.AI_RECAP && <AiRecapView />} */}
          {activeTab === NAVIGATION_TAB.SETTINGS && <SettingView />}
        </PageContent>
      </AuthGuard>
      <Footer />
    </div>
  );
}
