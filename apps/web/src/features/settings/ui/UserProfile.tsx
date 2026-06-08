"use client";

import Image from "next/image";
import { type UserProfileType } from "@recap/api";
import { useLocale } from "@recap/i18n";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Divider,
  Flex,
} from "@recap/ui";

import { LogoutButton } from "@/entities/login/ui";
import MailIcon from "@/shared/assets/icons/mail.svg";
import DefaultImg from "@/shared/assets/img/recap-1.png";

const profileImageAlt = ({
  lastName,
  firstName,
}: Pick<UserProfileType, "firstName" | "lastName">) =>
  [lastName, firstName].filter(Boolean).join(" ").trim();

const UserProfile = ({ profile }: { profile: UserProfileType | undefined }) => {
  const { t } = useLocale("settings");

  if (!profile) return null;

  const remoteUrl = profile.imageUrl?.trim();

  return (
    <Card className="flex w-full flex-col flex-nowrap items-stretch gap-0 px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8">
      <CardHeader className="shrink-0 p-0">
        <CardTitle className="text-body-1 text-gray-800">
          {t("account.title")}
        </CardTitle>
      </CardHeader>

      <Divider className="my-6 shrink-0" />

      <CardContent className="flex min-h-0 min-w-0 flex-1 flex-col p-0 pt-0">
        <Flex
          direction="column"
          align="flex-start"
          gap="none"
          className="w-full gap-4 md:flex-row md:items-center md:justify-between"
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
                <AvatarImage src={remoteUrl} alt={profileImageAlt(profile)} />
              ) : null}
              <AvatarFallback className="bg-transparent p-0">
                <Image
                  src={DefaultImg}
                  alt={profileImageAlt(profile)}
                  width={64}
                  height={64}
                  className="size-full rounded-full object-cover"
                />
              </AvatarFallback>
            </Avatar>

            <Flex direction="column" className="min-w-0 gap-1">
              <div className="text-headline-sb wrap-break-word text-gray-800">
                {profile.lastName}
                {profile.firstName}
              </div>

              <Flex align="center" className="gap-1">
                <MailIcon />
                <p className="text-body-1 m-0 min-w-0 p-0 text-gray-800">
                  {profile.email}
                </p>
              </Flex>
            </Flex>
          </Flex>

          <div className="w-full shrink-0 md:w-auto">
            <LogoutButton />
          </div>
        </Flex>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
