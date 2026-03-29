import { Divider } from "@/components";

import ProfileCard from "./ProfileCard";
import UntrackedDomainSetting from "./UntrackedDomainSetting";

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
