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
  const { profile, isLoading, isError } = useGetUserProfile();

  if (isLoading) return <SettingsLoadingPage />;
  if (isError || !profile) return <SettingsUnloginPage />;

  return (
    <>
      <UserProfile data={profile} />
      <LanguageSection />
      <ExcludedDomainSection domains={profile.excludedDomains} />
    </>
  );
};

export default SettingsPage;
