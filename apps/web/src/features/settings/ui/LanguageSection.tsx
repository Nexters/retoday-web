"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  type LanguageType,
  SUPPORTED_LANGUAGES,
} from "@recap/i18n";
import { cn } from "@recap/ui";

import { LanguageSelect } from "@/entities/language/ui";

const LOCALE_STORAGE_KEY = "re-today.locale";

function parseStoredLocale(raw: string | null): LanguageType {
  if (raw && SUPPORTED_LANGUAGES.includes(raw as LanguageType)) {
    return raw as LanguageType;
  }
  return DEFAULT_LANGUAGE;
}

type LanguageSectionProps = {
  disabled?: boolean;
};

const LanguageSection = ({ disabled = false }: LanguageSectionProps) => {
  const [localize, setLocalize] = useState<LanguageType>(DEFAULT_LANGUAGE);
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageType>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const initial = parseStoredLocale(
      window.localStorage.getItem(LOCALE_STORAGE_KEY),
    );
    setLocalize(initial);
    setSelectedLanguage(initial);
  }, []);

  const handleApply = () => {
    if (disabled || selectedLanguage === localize) return;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, selectedLanguage);
    } finally {
      setLocalize(selectedLanguage);
      window.dispatchEvent(
        new CustomEvent<LanguageType>("localechange", {
          detail: selectedLanguage,
        }),
      );
    }
  };

  return (
    <div
      className={cn(
        "rounded-[1.25rem] bg-white px-9 py-8 md:px-6 md:py-6 xl:px-9 xl:py-8",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <h2 className="text-heading-rg text-gray-800">Language (언어변경)</h2>

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
          적용하기
        </button>
      </div>
    </div>
  );
};

export default LanguageSection;
