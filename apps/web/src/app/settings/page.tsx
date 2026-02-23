"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { catchAPIError } from "@recap/api";
import { cn } from "@recap/ui";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import UserProfile from "@/app/settings/src/components/UserProfile";
import { tokenStore } from "@/app/settings/src/lib/token-store";
import { authAPIService, userAPIService } from "@/app/settings/src/service";
import RightIcon from "@/assets/icons/arrow-right.svg";

type BackendLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export default function SettingPage() {
  const [domain, setDomain] = useState("");

  const queryClient = useQueryClient();

  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: () => userAPIService.getUserProfile(),
    retry: false,
  });

  const isLoggedIn = useMemo(() => {
    if (profileLoading) return false;
    if (profileError) return false;
    return Boolean(profileData?.data);
  }, [profileData, profileError, profileLoading]);

  const refetchProfile = async () => {
    await queryClient.resetQueries({ queryKey: ["getUserProfile"] });
    await queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
  };

  return (
    <>
      {isLoggedIn ? (
        <UserProfile
          data={profileData?.data}
          onLogoutSuccess={refetchProfile}
        />
      ) : (
        <UnLoginUserProfile onLoginSuccess={refetchProfile} />
      )}

      <div
        className={cn(
          "rounded-[1.25rem] bg-white px-9 py-8",
          !isLoggedIn && "pointer-events-none opacity-50",
        )}
      >
        <h2 className="text-heading-rg text-gray-800">추적금지 도메인</h2>

        <p className="text-body-1 mt-2 text-gray-900">
          브라우저 사용 기록 집계에서 제외할 도메인을 관리합니다.
        </p>

        <div className="mt-6 space-y-1">
          {[1, 2].map((_, index) => (
            <div
              className="bg-gray-75 flex items-center justify-between rounded-full px-4 py-2"
              key={index}
            >
              <p className="text-body-1 text-gray-500">https://www.figma.com</p>

              <button className="text-body-1 text-[#ff4242]">삭제</button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <input
            className="text-body-2 w-full rounded-xl border border-solid border-gray-200 px-3 py-4 text-gray-900 placeholder:text-gray-500"
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="도메인 입력 ( 예 : abc.com sample.kr)"
          />

          <button
            className={cn(
              "text-subtitle-1-md rounded-xl px-6 py-4 whitespace-nowrap text-gray-100",
              domain.length === 0 ? "bg-gray-500" : "bg-gray-800",
            )}
          >
            추가하기
          </button>
        </div>
      </div>
    </>
  );
}

const UnLoginUserProfile = ({
  onLoginSuccess,
}: {
  onLoginSuccess: () => void | Promise<void>;
}) => {
  const tokenClientRef = useRef<ReturnType<
    NonNullable<
      NonNullable<NonNullable<Window["google"]>["accounts"]>["oauth2"]
    >["initTokenClient"]
  > | null>(null);

  const clientId = useMemo(
    () => process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
    [],
  );

  const onClickLogin = () => {
    if (!tokenClientRef.current) {
      return;
    }

    tokenClientRef.current.requestAccessToken({ prompt: "consent" });
  };

  useEffect(() => {
    if (!clientId) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const google = window.google;

      if (!google?.accounts?.oauth2?.initTokenClient) {
        return;
      }

      tokenClientRef.current = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "openid email profile",
        callback: async (resp) => {
          try {
            if (resp.error) {
              throw new Error(
                `Google error: ${resp.error} ${resp.error_description ?? ""}`.trim(),
              );
            }

            const googleAccessToken = resp.access_token;
            if (!googleAccessToken)
              throw new Error("Google access_token이 없어요.");

            const data = (await authAPIService.googleOauthLogin({
              oAuthToken: googleAccessToken,
              provider: "GOOGLE",
            })) as BackendLoginResponse;

            if (!data?.accessToken || !data?.refreshToken) {
              return;
            }

            tokenStore.set({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            });

            await onLoginSuccess();
          } catch (e: unknown) {
            catchAPIError(e);
          }
        },
      });
    };

    script.onerror = () => console.log("에러");
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [clientId, onLoginSuccess]);

  return (
    <div className="rounded-[1.25rem] bg-white px-9 py-8">
      <p className="text-body-1 text-gray-800">
        로그인하고 내 하루 기록을 확인해 보세요
      </p>

      <div className="my-6 h-px w-full bg-gray-200" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-14 rounded-full bg-gray-200" />
          <p className="text-headline-sb text-gray-800">로그인</p>
        </div>

        <button
          onClick={onClickLogin}
          className="flex items-center gap-1 rounded-xl border border-solid border-gray-300 bg-white px-6 py-4"
        >
          로그인
          <RightIcon />
        </button>
      </div>
    </div>
  );
};
