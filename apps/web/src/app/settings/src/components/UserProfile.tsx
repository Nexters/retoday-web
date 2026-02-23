"use client";

import Image from "next/image";
import { catchAPIError } from "@recap/api";

import { tokenStore } from "@/app/settings/src/lib/token-store";
import { authWithTokenAPIService } from "@/app/settings/src/service";
import type { UserProfileType } from "@/app/settings/src/service/schema/get-user-profile.schema";
import RightIcon from "@/assets/icons/arrow-right.svg";
import MailIcon from "@/assets/icons/mail.svg";
import DefaultImg from "@/assets/img/recap-1.png";

const UserProfile = ({
  data,
  onLogoutSuccess,
}: {
  data: UserProfileType | undefined;
  onLogoutSuccess: () => void | Promise<void>;
}) => {
  const handleLogout = async () => {
    try {
      await authWithTokenAPIService.logout();

      if ("clear" in tokenStore && typeof tokenStore.clear === "function") {
        tokenStore.clear();
      } else {
        tokenStore.set({ accessToken: "", refreshToken: "" });
      }

      await onLogoutSuccess();
    } catch (err) {
      catchAPIError(err);
    }
  };

  if (!data) return null;

  return (
    <div className="rounded-[1.25rem] bg-white px-9 py-8">
      <h2 className="text-heading-rg text-gray-800">내 계정</h2>

      <div className="my-6 h-px w-full bg-gray-200" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={data.imageUrl ?? DefaultImg}
            alt="profileImg"
            width={64}
            height={64}
            className="rounded-full"
          />

          <div className="space-y-1">
            <p className="text-headline-sb text-gray-800">
              {data.lastName}
              {data.firstName}
            </p>

            <div className="flex items-center gap-1">
              <MailIcon />
              <p className="text-body-1 text-gray-800">{data.email}</p>
            </div>
          </div>
        </div>

        <button
          className="flex items-center gap-1 rounded-xl border border-solid border-gray-300 bg-white px-6 py-4"
          onClick={handleLogout}
        >
          로그아웃
          <RightIcon />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
