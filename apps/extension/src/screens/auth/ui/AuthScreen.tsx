import { useLayoutEffect } from "react";
import { Trans, useLocale } from "@recap/i18n";

import { useAuthStore } from "@/app/store/model";
import { MESSAGE_TYPE } from "@/entities/history/model/messages.type";
import { LanguageSelect, useLanguageStore } from "@/entities/language";
import GoogleLoginButton from "@/screens/auth/ui/GoogleLoginButton";
import LogoImg from "@/shared/assets/icons/favicon-128.png";
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from "@/shared/config";
import useBrowserMessage from "@/shared/lib/browser/use-browser-message";
import { tokenStore } from "@/shared/lib/token-store";

const AuthScreen = () => {
  const { t } = useLocale("landing");

  const language = useLanguageStore((s) => s.localize);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);

  const checkAuth = async () => {
    const accessToken = await tokenStore.getAccess();
    setIsLoggedIn(accessToken !== null);
  };

  useLayoutEffect(() => {
    void checkAuth();
  }, []);

  useBrowserMessage(MESSAGE_TYPE.AUTH_CHANGED, () => {
    void checkAuth();
  });

  const handleGoogleLogin = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).chrome?.runtime?.sendMessage({
      type: MESSAGE_TYPE.GOOGLE_LOGIN,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-end px-4 pt-3">
        <LanguageSelect
          className="h-8 w-28"
          value={language}
          onValueChange={setLanguage}
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <img
          src={LogoImg}
          alt={t("landing.brand")}
          className="size-40 rounded-4xl"
        />
        <h1 className="text-display-1 mt-6">{t("landing.brand")}</h1>
        <h2 className="text-subtitle-1-md text-gray-800">
          {t("landing.headline")}
        </h2>
        <GoogleLoginButton className="mt-9" onClick={handleGoogleLogin} />
        <p className="text-caption-1 text-gray-500 mx-10 mt-9 text-center">
          <Trans
            i18nKey="auth.agreement"
            ns="landing"
            components={{
              terms: (
                <a
                  href={TERMS_OF_SERVICE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-04 bg-clip-text text-transparent underline"
                />
              ),
              privacy: (
                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-04 bg-clip-text text-transparent underline"
                />
              ),
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
