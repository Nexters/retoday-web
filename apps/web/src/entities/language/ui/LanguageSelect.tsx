"use client";

import { useUncontrolled } from "@recap/hooks";
import {
  DEFAULT_LANGUAGE,
  type LanguageType,
  SUPPORTED_LANGUAGES,
  useLocale,
} from "@recap/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@recap/ui";

const LANGUAGE_LABEL: Record<LanguageType, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};

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

  return (
    <Select
      value={selectedLanguage}
      onValueChange={handleChange}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={t("language.selectPlaceholder")} />
      </SelectTrigger>

      <SelectContent>
        {SUPPORTED_LANGUAGES.map((lng) => (
          <SelectItem key={lng} value={lng}>
            {LANGUAGE_LABEL[lng]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
