import { useState } from "react";
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
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");

  return (
    <div className="flex flex-col pt-8 px-5 pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-headline-sb text-gray-900">리캡 주기 설정</h2>
        <Switch size="sm">
          <SwitchThumb size="sm" />
        </Switch>
      </div>
      <p className="mt-1 text-subtitle-2-rg text-gray-800">
        지정된 시간에 리캡이 생성됩니다.
      </p>
      <p className="text-subtitle-2-rg text-gray-800">
        설정을 끌 경우 매일 자정에 배송됩니다.
      </p>

      <div className="bg-blue-50 rounded-xl p-5 mt-4">
        <div className="flex items-center gap-2">
          <Icon name="clock" className="size-5" />
          <h3 className="text-subtitle-2-sb text-gray-900">리캡 배송 시간</h3>
        </div>
        <p className="text-body-3 text-gray-800 mt-1">
          매일 이 시간에 리캡을 받습니다.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Select value={hour} onValueChange={setHour}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="시간">{hour}시</SelectValue>
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
              <SelectValue placeholder="분">{minute}분</SelectValue>
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
