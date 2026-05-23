"use client";

import { useCallback } from "react";
import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import { cn } from "@recap/ui";

import { useAuth } from "@/entities/auth/ui";
import { useGoogleTokenLogin } from "@/features/login/model/use-google-token-login";
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
    <button
      onClick={login}
      disabled={!ready}
      className={cn(
        "flex items-center gap-2 rounded-xl border border-solid border-gray-300 bg-white px-4 py-2 text-gray-800",
        !ready && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      {t("account.login")}
      <RightIcon />
    </button>
  );
};

export default LoginButton;
