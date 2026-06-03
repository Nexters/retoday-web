import { catchAPIError } from "@recap/api";
import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import { Button } from "@recap/ui";

import { authWithTokenAPIService } from "@/entities/auth/api";
import { tokenStore } from "@/entities/auth/model/token-store";
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
      await authWithTokenAPIService.logout();

      if ("clear" in tokenStore && typeof tokenStore.clear === "function") {
        tokenStore.clear();
      } else {
        tokenStore.set({ accessToken: "", refreshToken: "" });
      }

      analytics.identify(null);
      analytics.track("logout", {});
      refreshAuth();
      await queryClient.resetQueries({ queryKey: USER_KEYS.details() });
      await queryClient.invalidateQueries({ queryKey: USER_KEYS.details() });
    } catch (err) {
      catchAPIError(err);
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
