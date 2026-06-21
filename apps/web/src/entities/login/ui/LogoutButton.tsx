import { useLocale } from "@recap/i18n";
import { Button } from "@recap/ui";

import { logoutSession } from "@/entities/auth/api/auth-session-client";
import { useAuth } from "@/entities/auth/ui";
import RightIcon from "@/shared/assets/icons/arrow-right.svg";
import { useAnalytics } from "@/shared/lib/analytics";

const LogoutButton = () => {
  const { t } = useLocale("settings");

  const { refreshAuth } = useAuth();

  const analytics = useAnalytics();

  const handleLogout = async () => {
    try {
      await logoutSession();

      analytics.identify(null);
      analytics.track("logout", {});
      await refreshAuth();
    } catch (err) {
      analytics.track("web_error", {
        where: "logout",
        message: err instanceof Error ? err.message : undefined,
      });
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="md"
      className="flex items-center justify-center gap-2 px-4 py-2 md:w-auto md:justify-start"
      onClick={handleLogout}
    >
      {t("account.logout")}
      <RightIcon />
    </Button>
  );
};

export default LogoutButton;
