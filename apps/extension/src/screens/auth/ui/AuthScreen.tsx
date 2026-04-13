import { useLayoutEffect } from "react";

import { useAuthStore } from "@/app/store/model";
import { MESSAGE_TYPE } from "@/entities/history/model/messages.type";
import GoogleLoginButton from "@/screens/auth/ui/GoogleLoginButton";
import LogoImg from "@/shared/assets/icons/favicon-128.png";
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from "@/shared/config";
import useBrowserMessage from "@/shared/lib/browser/use-browser-message";
import { tokenStore } from "@/shared/lib/token-store";

const AuthScreen = () => {
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
      <div className="flex flex-1 flex-col items-center justify-center">
        <img src={LogoImg} alt="ReToday" className="size-40 rounded-4xl" />
        <h1 className="text-display-1 mt-6">ReToday</h1>
        <h2 className="text-subtitle-1-md text-gray-800">
          매일 밤 만나는 나의 브라우저 리캡
        </h2>
        <GoogleLoginButton className="mt-9" onClick={handleGoogleLogin} />
        <p className="text-caption-1 text-gray-500 mx-10 mt-9 text-center">
          By clicking on sign in you agree to our{" "}
          <a
            href={TERMS_OF_SERVICE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-04 bg-clip-text text-transparent underline"
          >
            Terms and Conditions
          </a>{" "}
          and our{" "}
          <a
            href={PRIVACY_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-04 bg-clip-text text-transparent underline"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
