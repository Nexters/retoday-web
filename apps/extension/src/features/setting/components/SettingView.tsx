import Divider from "@/components/Divider";
import ProfileCard from "@/features/setting/components/ProfileCard";
import UntrackedDomainSetting from "@/features/setting/components/UntrackedDomainSetting";

const SettingView = () => {
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

export default SettingView;
