import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

import { NAVIGATION_TAB } from "@/const/navigation.const";
import {
  PRIVACY_POLICY_URL,
  TERMS_OF_SERVICE_URL,
} from "@/const/retoday.const";
import GoogleLoginButton from "@/features/auth/components/GoogleLoginButton";
import NavigationTabs from "@/features/layout/components/NavigationTabs";
import PageContent from "@/features/layout/components/PageContent";
import PageHeader from "@/features/layout/components/PageHeader";
import useBrowserMessage from "@/hooks/use-browser-message";
import { tokenStore } from "@/lib/token-store";
import { MESSAGE_TYPE } from "@/types/messages";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const checkAuth = async () => {
    const accessToken = await tokenStore.getAccess();
    setIsLoggedIn(accessToken !== null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useBrowserMessage(MESSAGE_TYPE.AUTH_CHANGED, () => {
    checkAuth();
  });

  const handleGoogleLogin = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).chrome?.runtime?.sendMessage({
      type: MESSAGE_TYPE.GOOGLE_LOGIN,
    });
  };

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <>
      <PageHeader>
        <NavigationTabs defaultValue={NAVIGATION_TAB.ANALYSIS} />
      </PageHeader>
      <PageContent className="pt-12">
        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="size-40 bg-gray-100" />
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
      </PageContent>
    </>
  );
};

export default AuthGuard;
