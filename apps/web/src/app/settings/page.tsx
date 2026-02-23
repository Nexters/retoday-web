"use client";

import { useMemo, useState } from "react";
import { cn } from "@recap/ui";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import UserProfile from "@/app/settings/src/components/UserProfile";
import { userAPIService } from "@/app/settings/src/service";
import LoginButton from "@/components/LoginButton";

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

        <LoginButton onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
};
