"use client";

import { useLocale } from "@recap/i18n";
import { Button, cn } from "@recap/ui";

import { useGoogleTokenLogin } from "@/entities/login/model/use-google-token-login";
import RightIcon from "@/shared/assets/icons/arrow-right.svg";

const LoginButton = ({ className }: { className?: string }) => {
  const { t } = useLocale("settings");
  const { ready, login } = useGoogleTokenLogin();

  return (
    <Button
      type="button"
      variant="secondary"
      size="md"
      onClick={() => login()}
      disabled={!ready}
      className={cn("flex gap-2 px-4 py-2", className)}
    >
      {t("account.login")}
      <RightIcon />
    </Button>
  );
};

export default LoginButton;
