"use client";

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_LABEL,
  LANGUAGE_UTC_OFFSET,
  type LanguageType,
  SUPPORTED_LANGUAGES,
  useLocale,
} from "@recap/i18n";
import { useUncontrolled } from "@recap/lib";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@recap/ui";

import { useAuth } from "@/entities/auth/ui";

type LanguageSelectProps = {
  className?: string;

  /** controlled mode */
  value?: LanguageType;

  /** uncontrolled mode initial value */
  defaultValue?: LanguageType;

  /** controlled/uncontrolled 공통 change callback */
  onValueChange?: (next: LanguageType) => void;

  disabled?: boolean;
};

const LanguageSelect = ({
  className,
  value,
  defaultValue,
  onValueChange,
  disabled,
}: LanguageSelectProps) => {
  const { t } = useLocale("settings");
  const { isLoggedIn } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useUncontrolled<LanguageType>(
    {
      value,
      defaultValue,
      finalValue: DEFAULT_LANGUAGE,
      onChange: onValueChange,
    },
  );

  const handleChange = (next: string) => {
    setSelectedLanguage(next as LanguageType);
  };

  const getLanguageLabel = (lng: LanguageType) => {
    if (!isLoggedIn) {
      return LANGUAGE_LABEL[lng];
    }

    return t("language.optionWithTimeZone", {
      language: LANGUAGE_LABEL[lng],
      offset: LANGUAGE_UTC_OFFSET[lng],
    });
  };

  return (
    <Select
      value={selectedLanguage}
      onValueChange={handleChange}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue
          placeholder={
            isLoggedIn
              ? t("language.loggedInSelectPlaceholder")
              : t("language.selectPlaceholder")
          }
        />
      </SelectTrigger>

      <SelectContent>
        {SUPPORTED_LANGUAGES.map((lng) => (
          <SelectItem key={lng} value={lng}>
            {getLanguageLabel(lng)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
