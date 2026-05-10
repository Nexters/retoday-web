"use client";

import { useState } from "react";
import { type LanguageType, useLocale } from "@recap/i18n";
import { cn } from "@recap/ui";

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
    <div
      className={cn(
        "rounded-[1.25rem] bg-white px-9 py-8 md:px-6 md:py-6 xl:px-9 xl:py-8",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <h2 className="text-heading-rg text-gray-800">
        {t("languageChange.title")}
      </h2>

      <div className="mt-6 flex flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-4">
        <div className="w-full min-w-0 md:flex-1">
          <LanguageSelect
            key={localize}
            className="h-auto min-h-[52px] w-full rounded-xl border-gray-200 py-4"
            defaultValue={localize}
            onValueChange={setSelectedLanguage}
            disabled={disabled}
          />
        </div>

        <button
          type="button"
          className={cn(
            "text-subtitle-1-md rounded-xl px-6 py-4 whitespace-nowrap text-gray-100",
            selectedLanguage === localize ? "bg-gray-500" : "bg-gray-800",
          )}
          onClick={handleApply}
          disabled={disabled}
        >
          {t("languageChange.apply")}
        </button>
      </div>
    </div>
  );
};

export default LanguageSection;
