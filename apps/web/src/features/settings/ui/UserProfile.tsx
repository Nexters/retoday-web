"use client";

import Image from "next/image";
import { catchAPIError, type UserProfileType } from "@recap/api";
import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Divider,
  Flex,
} from "@recap/ui";

import { authWithTokenAPIService } from "@/entities/auth/api";
import { tokenStore } from "@/entities/auth/model/token-store";
import { useAuth } from "@/entities/auth/ui";
import { USER_KEYS } from "@/features/settings/api/query-keys";
import RightIcon from "@/shared/assets/icons/arrow-right.svg";
import MailIcon from "@/shared/assets/icons/mail.svg";
import DefaultImg from "@/shared/assets/img/recap-1.png";

const profileImageAlt = ({
  lastName,
  firstName,
}: Pick<UserProfileType, "firstName" | "lastName">) =>
  [lastName, firstName].filter(Boolean).join(" ").trim();

const UserProfile = ({ data }: { data: UserProfileType | undefined }) => {
  const { t } = useLocale("settings");
  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await authWithTokenAPIService.logout();

      if ("clear" in tokenStore && typeof tokenStore.clear === "function") {
        tokenStore.clear();
      } else {
        tokenStore.set({ accessToken: "", refreshToken: "" });
      }

      refreshAuth();
      await queryClient.resetQueries({ queryKey: USER_KEYS.details() });
      await queryClient.invalidateQueries({ queryKey: USER_KEYS.details() });
    } catch (err) {
      catchAPIError(err);
    }
  };

  if (!data) return null;

  const remoteUrl = data.imageUrl?.trim();

  return (
    <Card className="flex w-full flex-col flex-nowrap items-stretch gap-0 px-9 py-8">
      <CardHeader className="shrink-0 p-0">
        <CardTitle className="text-heading-rg text-gray-800">
          {t("account.title")}
        </CardTitle>
      </CardHeader>

      <Divider className="my-6 shrink-0" />

      <CardContent className="flex min-h-0 min-w-0 flex-1 flex-col p-0 pt-0">
        <Flex
          wrap="wrap"
          align="center"
          justify="space-between"
          gap="none"
          className="w-full gap-6"
        >
          <Flex
            direction="row"
            wrap="nowrap"
            align="center"
            gap="none"
            className="min-w-0 flex-1 gap-3"
          >
            <Avatar className="size-16 shrink-0">
              {remoteUrl ? (
                <AvatarImage src={remoteUrl} alt={profileImageAlt(data)} />
              ) : null}
              <AvatarFallback className="bg-transparent p-0">
                <Image
                  src={DefaultImg}
                  alt={profileImageAlt(data)}
                  width={64}
                  height={64}
                  className="size-full rounded-full object-cover"
                />
              </AvatarFallback>
            </Avatar>

            <Flex direction="column" className="min-w-0 gap-1">
              <div className="text-headline-sb wrap-break-word text-gray-800">
                {data.lastName}
                {data.firstName}
              </div>

              <Flex align="center" className="gap-1">
                <MailIcon />
                <p className="text-body-1 m-0 min-w-0 p-0 text-gray-800">
                  {data.email}
                </p>
              </Flex>
            </Flex>
          </Flex>

          <Button
            type="button"
            variant="secondary"
            size="md"
            className="inline-flex shrink-0 items-center gap-1 rounded-xl px-6 py-4"
            onClick={handleLogout}
          >
            {t("account.logout")}
            <RightIcon />
          </Button>
        </Flex>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
