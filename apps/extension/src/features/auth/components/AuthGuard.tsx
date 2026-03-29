import type { PropsWithChildren } from "react";
import { useLayoutEffect, useState } from "react";

import LogoImg from "@/assets/icons/favicon-128.png";
import {
  Content,
  GnbTabs,
  GnbTabsList,
  GnbTabsTrigger,
  Header,
} from "@/components";
import {
  GNB_TABS,
  NAVIGATION_TAB,
  PRIVACY_POLICY_URL,
  TERMS_OF_SERVICE_URL,
} from "@/const";
import GoogleLoginButton from "@/features/auth/components/GoogleLoginButton";
import useBrowserMessage from "@/hooks/use-browser-message";
import { tokenStore } from "@/lib/token-store";
import { MESSAGE_TYPE } from "@/types/messages";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const checkAuth = async () => {
    const accessToken = await tokenStore.getAccess();
    setIsLoggedIn(accessToken !== null);
  };

  useLayoutEffect(() => {
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

  if (isLoggedIn === null) {
    return null;
  }

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <>
      <Header>
        <GnbTabs
          defaultValue={NAVIGATION_TAB.ANALYSIS}
          className="border-b border-gray-200 w-full"
        >
          <GnbTabsList>
            {GNB_TABS.map(({ label, value }) => (
              <GnbTabsTrigger
                className="cursor-pointer"
                key={value}
                value={value}
              >
                {label}
              </GnbTabsTrigger>
            ))}
          </GnbTabsList>
        </GnbTabs>
      </Header>
      <Content className="pt-12">
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
      </Content>
    </>
  );
};

export default AuthGuard;
