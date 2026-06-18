import { serverUserProfileQueryOptions } from "@/features/settings/api/user-query.server";
import SettingContent from "@/features/settings/ui/SettingContent";
import FetchBoundary from "@/shared/lib/query/FetchBoundary";

const SettingsPage = async () => {
  return (
    <FetchBoundary queries={[serverUserProfileQueryOptions()]}>
      <SettingContent />
    </FetchBoundary>
  );
};

export default SettingsPage;
