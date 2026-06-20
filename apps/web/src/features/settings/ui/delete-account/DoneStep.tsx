"use client";

import { useLocale } from "@recap/i18n";
import { Button, DialogFooter } from "@recap/ui";

type DoneStepProps = {
  onClose: () => void;
};

const DoneStep = ({ onClose }: DoneStepProps) => {
  const { t } = useLocale("settings");

  return (
    <div className="flex flex-col justify-center px-5 pt-4 pb-5">
      <span className="text-body-2 text-center text-gray-900">
        {t("deleteAccount.doneMessage")}
      </span>

      <DialogFooter className="mt-6 flex items-center">
        <Button type="button" onClick={onClose}>
          {t("deleteAccount.confirmButton")}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default DoneStep;
