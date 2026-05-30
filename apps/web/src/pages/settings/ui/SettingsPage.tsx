"use client";

import { AuthConsumer } from "@/entities/auth/ui";
import { useGetUserProfile } from "@/features/settings/api/user-query";
import ExcludedDomainSection from "@/features/settings/ui/ExcludedDomainSection";
import LanguageSection from "@/features/settings/ui/LanguageSection";
import UserProfile from "@/features/settings/ui/UserProfile";

import SettingsLoadingPage from "./SettingsLoadingPage";
import SettingsUnloginPage from "./SettingsUnloginPage";

const SettingsPage = () => (
  <AuthConsumer>
    {({ isReady, isLoggedIn }) => {
      if (!isReady) return <SettingsLoadingPage />;
      if (!isLoggedIn) return <SettingsUnloginPage />;
      return <LoggedInSettings />;
    }}
  </AuthConsumer>
);

const LoggedInSettings = () => {
  const { data, isLoading, isError } = useGetUserProfile({
    select: (data) => data?.data,
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

export default SettingsPage;
