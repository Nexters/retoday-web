import { ProfileCard, UntrackedDomainSetting } from "@/features/setting/ui";
import { Divider } from "@/shared/ui";

const SettingScreen = () => {
  return (
    <>
      <ProfileCard />
      <Divider />
      {/* <RecapIntervalSetting />
      <Divider /> */}
      <UntrackedDomainSetting />
    </>
  );
};

export default SettingScreen;
