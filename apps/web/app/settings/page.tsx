import { Suspense } from "react";

import AuthBoundary from "@/entities/auth/ui/AuthBoundary";
import { serverUserProfileQueryOptions } from "@/features/settings/api/user-query.server";
import { SettingsPage } from "@/pages/settings/ui";
import SettingsLoadingPage from "@/pages/settings/ui/SettingsLoadingPage";
import SettingsUnloginPage from "@/pages/settings/ui/SettingsUnloginPage";
import FetchBoundary from "@/shared/lib/query/FetchBoundary";

export default async function Page() {
  return (
    <AuthBoundary
      fallback={<SettingsUnloginPage />}
      loading={<SettingsLoadingPage />}
    >
      <Suspense fallback={<SettingsLoadingPage />}>
        <FetchBoundary queries={[serverUserProfileQueryOptions()]}>
          <SettingsPage />
        </FetchBoundary>
      </Suspense>
    </AuthBoundary>
  );
}
