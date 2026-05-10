"use client";

import { useLocale } from "@recap/i18n";
import { cn } from "@recap/ui";

import { useGoogleTokenLogin } from "@/features/login/model/use-google-token-login";
import RightIcon from "@/shared/assets/icons/arrow-right.svg";

const LoginButton = ({
  onLoginSuccess,
  className,
  children,
}: {
  onLoginSuccess?: () => void | Promise<void>;
  className?: string;
  children?: React.ReactNode;
}) => {
  const { ready, login } = useGoogleTokenLogin({ onLoginSuccess });
  const { t } = useLocale("settings");

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
      {children ?? t("account.login")}
      <RightIcon />
    </button>
  );
};

export default LoginButton;
