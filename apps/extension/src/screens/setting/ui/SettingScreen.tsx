import { useAuth } from "@/entities/auth/ui";
import { useGetUserProfile } from "@/features/setting/api/user-query";
import {
  LangeChangedSetting,
  ProfileCard,
  UntrackedDomainSetting,
} from "@/features/setting/ui";
import { Divider } from "@/shared/ui";
import { ScrollPanel } from "@/shared/ui/ScrollPanel";

const SettingScreen = () => {
  const { isReady, isLoggedIn } = useAuth();
  const { data: profile } = useGetUserProfile({
    select: (data) => data?.data,
    enabled: isReady && isLoggedIn,
  });

  return (
    <ScrollPanel>
      <ScrollPanel.Body>
        <ProfileCard profile={profile} />
        <Divider />
        <LangeChangedSetting />
        <Divider />
        {/* <RecapIntervalSetting />
      <Divider /> */}
        <UntrackedDomainSetting domains={profile?.excludedDomains ?? []} />
      </ScrollPanel.Body>
    </ScrollPanel>
  );
};

export default SettingScreen;
