"use client";

import { useCallback } from "react";
import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import { Button, cn } from "@recap/ui";

import { useAuth } from "@/entities/auth/ui";
import { useGoogleTokenLogin } from "@/entities/login/model/use-google-token-login";
import { USER_KEYS } from "@/features/settings/api/query-keys";
import RightIcon from "@/shared/assets/icons/arrow-right.svg";

const LoginButton = ({ className }: { className?: string }) => {
  const { t } = useLocale("settings");
  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();

  const onLoginSuccess = useCallback(async () => {
    await queryClient.resetQueries({ queryKey: USER_KEYS.details() });
    await queryClient.invalidateQueries({ queryKey: USER_KEYS.details() });
    refreshAuth();
  }, [queryClient, refreshAuth]);

  const { ready, login } = useGoogleTokenLogin({
    onLoginSuccess,
  });

  return (
    <Button
      type="button"
      variant="secondary"
      size="md"
      onClick={login}
      disabled={!ready}
      className={cn("flex gap-2 px-4 py-2", className)}
    >
      {t("account.login")}
      <RightIcon />
    </Button>
  );
};

export default LoginButton;
