import { useGetUserProfile } from "@/features/setting/api/user-query";
import {
  LangeChangedSetting,
  ProfileCard,
  UntrackedDomainSetting,
} from "@/features/setting/ui";
import { Divider } from "@/shared/ui";

const SettingScreen = () => {
  const { data: profile } = useGetUserProfile({
    select: (data) => data?.data,
  });

  return (
    <>
      <ProfileCard profile={profile} />
      <Divider />
      <LangeChangedSetting />
      <Divider />
      {/* <RecapIntervalSetting />
      <Divider /> */}
      <UntrackedDomainSetting domains={profile?.excludedDomains ?? []} />
    </>
  );
};

export default SettingScreen;
