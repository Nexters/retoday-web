import { useState } from "react";
import { type LanguageType, useLocale } from "@recap/i18n";
import { Button } from "@recap/ui";

import { LanguageSelect, useLanguageStore } from "@/entities/language";

const LangeChangedSetting = () => {
  const { t } = useLocale("settings");

  const localize = useLanguageStore((s) => s.localize);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageType>(localize);

  const handleApply = () => {
    setLanguage(selectedLanguage);
  };

  return (
    <div className="pt-8 pb-6 px-5">
      <h2 className="text-headline-sb text-gray-900">
        {t("languageChange.title")}
      </h2>
      <div className="my-4">
        <LanguageSelect
          key={localize}
          defaultValue={localize}
          onValueChange={setSelectedLanguage}
        />
      </div>
      <Button
        variant="secondary"
        onClick={handleApply}
        disabled={selectedLanguage === localize}
      >
        {t("languageChange.apply")}
      </Button>
    </div>
  );
};

export default LangeChangedSetting;
