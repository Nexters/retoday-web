import { Skeleton } from "@recap/ui";

import ExcludedDomainSection from "@/features/settings/ui/ExcludedDomainSection";
import LanguageSection from "@/features/settings/ui/LanguageSection";

const SettingsLoadingPage = () => {
  return (
    <>
      <div className="rounded-[1.25rem] bg-white px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8">
        <Skeleton className="h-6 w-56" />
        <div className="my-6 h-px w-full bg-gray-200" />
        <div className="flex items-center gap-3">
          <Skeleton className="size-14 rounded-full" />
          <Skeleton className="h-6 w-28" />
        </div>
      </div>

      <LanguageSection />
      <ExcludedDomainSection domains={[]} disabled />
    </>
  );
};

export default SettingsLoadingPage;
