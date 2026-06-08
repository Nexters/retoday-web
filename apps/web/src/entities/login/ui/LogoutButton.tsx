import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import { Button } from "@recap/ui";

import { logoutSession } from "@/entities/auth/api/auth-session-client";
import { useAuth } from "@/entities/auth/ui";
import { USER_KEYS } from "@/features/settings/api/query-keys";
import RightIcon from "@/shared/assets/icons/arrow-right.svg";
import { useAnalytics } from "@/shared/lib/analytics";

const LogoutButton = () => {
  const { t } = useLocale("settings");

  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();
  const analytics = useAnalytics();

  const handleLogout = async () => {
    try {
      await logoutSession();

      analytics.identify(null);
      analytics.track("logout", {});
      await refreshAuth();
      await queryClient.resetQueries({ queryKey: USER_KEYS.details() });
      await queryClient.invalidateQueries({ queryKey: USER_KEYS.details() });
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
      className="inline-flex w-full shrink-0 items-center justify-center gap-1 rounded-xl px-6 py-4 md:w-auto md:justify-start"
      onClick={handleLogout}
    >
      {t("account.logout")}
      <RightIcon />
    </Button>
  );
};

export default LogoutButton;
