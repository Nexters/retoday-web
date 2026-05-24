import { useLocale } from "@recap/i18n";
import {
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Divider,
  Flex,
} from "@recap/ui";

import { LoginButton } from "@/entities/login/ui";

const UserLoginSection = () => {
  const { t } = useLocale("settings");

  return (
    <Card className="flex w-full flex-col flex-nowrap items-stretch gap-0 px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8">
      <CardHeader className="shrink-0 p-0">
        <CardTitle className="text-body-1 text-gray-800">
          {t("account.dailyRecordsPrompt")}
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
            <Avatar aria-hidden className="shrink-0">
              <AvatarFallback />
            </Avatar>
            <div className="text-headline-sb text-gray-800">
              {t("account.login")}
            </div>
          </Flex>

          <div className="w-full shrink-0 md:w-auto">
            <LoginButton className="w-full justify-center md:w-auto md:justify-start" />
          </div>
        </Flex>
      </CardContent>
    </Card>
  );
};

export default UserLoginSection;
