import { Suspense } from "react";

import AuthBoundary from "@/entities/auth/ui/AuthBoundary";
import { SettingsPage } from "@/pages/settings/ui";
import SettingsLoadingPage from "@/pages/settings/ui/SettingsLoadingPage";
import SettingsUnloginPage from "@/pages/settings/ui/SettingsUnloginPage";

export default async function Page() {
  return (
    <AuthBoundary
      fallback={<SettingsUnloginPage />}
      loading={<SettingsLoadingPage />}
    >
      <Suspense fallback={<SettingsLoadingPage />}>
        <SettingsPage />
      </Suspense>
    </AuthBoundary>
  );
}
