import { useState } from "react";
import { type LanguageType, useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import { Button } from "@recap/ui";

import { LanguageSelect } from "@/entities/language";
import useLanguage from "@/entities/language/model/use-language";
import { AI_RECAP_KEYS } from "@/features/ai-recap/api/query-keys";
import { USER_KEYS } from "@/features/setting/api/query-keys";
import { usePatchUserProfile } from "@/features/setting/api/user-query";
import { LANGUAGE_TO_PROFILE } from "@/features/setting/config/language.const";

const LangeChangedSetting = () => {
  const { t } = useLocale("settings");
  const { language, setLanguage } = useLanguage();
  const queryClient = useQueryClient();

  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageType>(language);

  const { mutate, isPending } = usePatchUserProfile({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.details(),
      });
      queryClient.invalidateQueries({
        queryKey: AI_RECAP_KEYS.all,
      });
    },
  });

  const handleApply = () => {
    if (selectedLanguage === language) return;

    mutate(LANGUAGE_TO_PROFILE[selectedLanguage], {
      onSuccess: () => {
        setLanguage(selectedLanguage);
      },
    });
  };

  return (
    <div className="pt-8 pb-6 px-5">
      <h2 className="text-headline-sb text-gray-900">
        {t("languageChange.title")}
      </h2>
      <div className="my-4">
        <LanguageSelect
          key={language}
          defaultValue={language}
          onValueChange={setSelectedLanguage}
        />
      </div>
      <Button
        variant="secondary"
        onClick={handleApply}
        disabled={selectedLanguage === language || isPending}
      >
        {t("languageChange.apply")}
      </Button>
    </div>
  );
};

export default LangeChangedSetting;
