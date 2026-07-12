import { Suspense } from "react";

import ExtensionAuthPage from "@/pages/auth/ui/ExtensionAuthPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center px-4 text-center text-sm text-gray-500">
          Signing in…
        </div>
      }
    >
      <ExtensionAuthPage />
    </Suspense>
  );
}
