"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { AuthConsumer } from "@/entities/auth/ui";
import { userProfileQueryOptions } from "@/features/settings/api/user-query.client";
import ExcludedDomainSection from "@/features/settings/ui/ExcludedDomainSection";
import LanguageSection from "@/features/settings/ui/LanguageSection";
import UserProfile from "@/features/settings/ui/UserProfile";
import SettingsLoadingPage from "@/pages/settings/ui/SettingsLoadingPage";
import SettingsUnloginPage from "@/pages/settings/ui/SettingsUnloginPage";

const SettingContent = () => (
  <AuthConsumer>
    {({ isReady, isLoggedIn }) => {
      if (!isReady) return <SettingsLoadingPage />;
      if (!isLoggedIn) return <SettingsUnloginPage />;
      return <LoggedInSettings />;
    }}
  </AuthConsumer>
);

const LoggedInSettings = () => {
  const { data, isLoading, isError } = useSuspenseQuery({
    ...userProfileQueryOptions(),
    select: (data) => data.data,
  });

  if (isLoading) return <SettingsLoadingPage />;
  if (isError || !data) return <SettingsUnloginPage />;

  return (
    <>
      <UserProfile profile={data} />
      <LanguageSection />
      <ExcludedDomainSection domains={data.excludedDomains} />
    </>
  );
};

export default SettingContent;
