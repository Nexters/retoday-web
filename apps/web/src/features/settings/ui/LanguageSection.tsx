"use client";

import { useState } from "react";
import { type LanguageType, useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  Flex,
  useToast,
} from "@recap/ui";

import { useAuth } from "@/entities/auth/ui";
import { LanguageSelect, useLanguage } from "@/entities/language";
import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";
import { USER_KEYS } from "@/features/settings/api/query-keys";
import { usePatchUserProfile } from "@/features/settings/api/user-query.client";
import { LANGUAGE_TO_PROFILE } from "@/features/settings/config/language.const";

type LanguageSectionProps = {
  disabled?: boolean;
};

const LanguageSection = ({ disabled = false }: LanguageSectionProps) => {
  const { t, i18n } = useLocale("settings");
  const { showToast } = useToast();

  const { isLoggedIn } = useAuth();
  const { language, setLanguage } = useLanguage();
  const queryClient = useQueryClient();

  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageType>(language);

  const { mutate, isPending } = usePatchUserProfile({
    onSuccess: () => {
      setLanguage(selectedLanguage);

      queryClient.invalidateQueries({
        queryKey: USER_KEYS.details(),
      });

      queryClient.invalidateQueries({
        queryKey: AI_RECAP_KEYS.all,
      });

      showToast({
        type: "success",
        message: i18n.t("languageChange.success", {
          lng: selectedLanguage,
          ns: "settings",
        }),
      });
    },
    onError: () => {
      showToast({
        type: "error",
        message: t("error.network"),
      });
    },
  });

  const handleApply = () => {
    if (disabled || selectedLanguage === language) return;
    if (isLoggedIn) {
      mutate(LANGUAGE_TO_PROFILE[selectedLanguage]);
      return;
    }

    setLanguage(selectedLanguage);
    showToast({
      type: "success",
      message: i18n.t("languageChange.success", {
        lng: selectedLanguage,
        ns: "settings",
      }),
    });
  };

  return (
    <Card
      className={cn(
        "flex w-full flex-col flex-nowrap items-stretch gap-6 px-9 py-8 md:px-6 md:py-6 xl:px-9 xl:py-8",

        disabled && "pointer-events-none opacity-50",
      )}
    >
      <CardHeader className="shrink-0 p-0">
        <CardTitle className="text-heading-rg text-gray-800">
          {t("languageChange.title")}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex min-h-0 min-w-0 flex-1 flex-col p-0 pt-0">
        <Flex
          direction="column"
          gap="none"
          className="w-full gap-6 md:flex-row md:items-center md:gap-4"
        >
          <div className="w-full min-w-0 md:flex-1">
            <LanguageSelect
              key={language}
              className="h-auto min-h-[52px] w-full rounded-xl border-gray-200 py-4"
              defaultValue={language}
              onValueChange={setSelectedLanguage}
              disabled={disabled}
            />
          </div>

          <div className="w-full shrink-0 md:w-auto">
            <Button
              type="button"
              variant="default"
              size="md"
              className={cn(
                "px-6 md:w-auto! md:justify-start!",

                selectedLanguage === language &&
                  "bg-gray-500 hover:bg-gray-600",
              )}
              onClick={handleApply}
              disabled={disabled || selectedLanguage === language || isPending}
            >
              {t("languageChange.apply")}
            </Button>
          </div>
        </Flex>
      </CardContent>
    </Card>
  );
};

export default LanguageSection;
