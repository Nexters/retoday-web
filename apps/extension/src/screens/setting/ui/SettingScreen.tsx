import { ProfileCard, UntrackedDomainSetting } from "@/features/setting/ui";
import { Content, Divider } from "@/shared/ui";

const SettingScreen = () => {
  return (
    <Content>
      <ProfileCard />
      <Divider />
      {/* <RecapIntervalSetting />
      <Divider /> */}
      <UntrackedDomainSetting />
    </Content>
  );
};

export default SettingScreen;
