"use client";

import { useState } from "react";
import { type LanguageType, useLocale } from "@recap/i18n";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  Flex,
} from "@recap/ui";

import { LanguageSelect, useLanguageStore } from "@/entities/language";

type LanguageSectionProps = {
  disabled?: boolean;
};

const LanguageSection = ({ disabled = false }: LanguageSectionProps) => {
  const { t } = useLocale("settings");
  const localize = useLanguageStore((s) => s.localize);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageType>(localize);

  const handleApply = () => {
    if (disabled || selectedLanguage === localize) return;
    setLanguage(selectedLanguage);
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
              key={localize}
              className="h-auto min-h-[52px] w-full rounded-xl border-gray-200 py-4"
              defaultValue={localize}
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
                selectedLanguage === localize &&
                  "bg-gray-500 hover:bg-gray-600",
              )}
              onClick={handleApply}
              disabled={disabled}
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
