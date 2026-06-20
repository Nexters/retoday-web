"use client";

import { useState } from "react";
import { useLocale } from "@recap/i18n";
import { Button, DialogFooter } from "@recap/ui";

type DoneStepProps = {
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
};

const DoneStep = ({ onClose, onConfirm }: DoneStepProps) => {
  const { t } = useLocale("settings");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center px-5 pt-4 pb-5">
      <span className="text-body-2 text-center text-gray-900">
        {t("deleteAccount.doneMessage")}
      </span>

      <DialogFooter className="mt-6 flex items-center">
        <Button type="button" onClick={handleConfirm} disabled={isSubmitting}>
          {t("deleteAccount.confirmButton")}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default DoneStep;
