import { useState } from "react";
import { useLocale } from "@recap/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  SwitchThumb,
} from "@recap/ui";

import { Icon } from "@/shared/ui";

const RecapIntervalSetting = () => {
  const { t } = useLocale("settings");
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");

  return (
    <div className="flex flex-col pt-8 px-5 pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-headline-sb text-gray-900">
          {t("recapFrequency.title")}
        </h2>
        <Switch size="sm">
          <SwitchThumb size="sm" />
        </Switch>
      </div>
      <p className="mt-1 text-subtitle-2-rg text-gray-800">
        {t("recapFrequency.description")}
      </p>

      <div className="bg-blue-50 rounded-xl p-5 mt-4">
        <div className="flex items-center gap-2">
          <Icon name="clock" className="size-5" />
          <h3 className="text-subtitle-2-sb text-gray-900">
            {t("recapFrequency.deliveryTime")}
          </h3>
        </div>
        <p className="text-body-3 text-gray-800 mt-1">
          {t("recapFrequency.receiveDailyAtThisTime")}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Select value={hour} onValueChange={setHour}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={t("recapFrequency.hourSelectPlaceholder")}
              >
                {t("recapFrequency.hourUnit", { n: Number(hour) })}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => (
                <SelectItem key={i} value={String(i).padStart(2, "0")}>
                  {String(i).padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={minute} onValueChange={setMinute}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={t("recapFrequency.minuteSelectPlaceholder")}
              >
                {t("recapFrequency.minuteUnit", { n: Number(minute) })}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }, (_, i) => (
                <SelectItem key={i} value={String(i).padStart(2, "0")}>
                  {String(i).padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default RecapIntervalSetting;
