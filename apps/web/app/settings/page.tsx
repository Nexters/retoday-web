import { Suspense } from "react";

import { SettingsPage } from "@/pages/settings/ui";
import SettingsLoadingPage from "@/pages/settings/ui/SettingsLoadingPage";

export default async function Page() {
  return (
    <Suspense fallback={<SettingsLoadingPage />}>
      <SettingsPage />
    </Suspense>
  );
}
