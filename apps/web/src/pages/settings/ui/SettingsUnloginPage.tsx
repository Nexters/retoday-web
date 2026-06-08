"use client";

import ExcludedDomainSection from "@/features/settings/ui/ExcludedDomainSection";
import LanguageSection from "@/features/settings/ui/LanguageSection";
import UserLoginSection from "@/features/settings/ui/UserLoginSection";

const SettingsUnloginPage = () => {
  return (
    <>
      <UserLoginSection />
      <LanguageSection />
      <ExcludedDomainSection domains={[]} disabled />
    </>
  );
};

export default SettingsUnloginPage;
