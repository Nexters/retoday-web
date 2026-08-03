import { Suspense } from "react";

import AuthBoundary from "@/entities/auth/ui/AuthBoundary";
import { AiRecapPage } from "@/pages/ai-recap/ui";
import AiRecapLoadingPage from "@/pages/ai-recap/ui/AiRecapLoadingPage";
import AiRecapUnloginPage from "@/pages/ai-recap/ui/AiRecapUnloginPage";

export default function Page() {
  return (
    <AuthBoundary
      fallback={<AiRecapUnloginPage />}
      loading={<AiRecapLoadingPage />}
    >
      <Suspense fallback={<AiRecapLoadingPage />}>
        <AiRecapPage />
      </Suspense>
    </AuthBoundary>
  );
}
