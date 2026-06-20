"use client";

import { useState } from "react";
import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  DialogFooter,
  useStepper,
} from "@recap/ui";

import ErrorIcon from "@/shared/assets/icons/error.svg";

type ConfirmStepProps = {
  onSubmit: () => Promise<void> | void;
  onCancel: () => void;
};

const ConfirmStep = ({ onSubmit, onCancel }: ConfirmStepProps) => {
  const { next } = useStepper();
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!agreed || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit();
      next();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-col gap-6 pb-3">
        <Alert>
          <AlertDescription>
            <ErrorIcon />
            지금 탈퇴하시면 배송 예정된 리캡을 받아볼 수 없어요
          </AlertDescription>
          <AlertDescription>
            <ErrorIcon />
            탈퇴 후에는 분석, 리캡 기록을 이용할 수 없게 돼요. 추후에 동일
            계정으로 재가입하더라도 내역은 복구되지 않아요
          </AlertDescription>
        </Alert>
        <label className="flex items-center gap-1">
          <Checkbox
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked === true)}
          />
          <span className="text-body-2 text-gray-800">
            회원탈퇴 안내사항을 확인하였으며, 이에 동의합니다.
          </span>
        </label>
      </div>

      <DialogFooter className="flex items-center gap-2">
        <Button
          className="flex-1"
          variant="secondary"
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          취소하기
        </Button>
        <Button
          className="flex-2"
          type="button"
          disabled={!agreed || isSubmitting}
          onClick={handleContinue}
        >
          {agreed ? "계속하기" : "회원탈퇴"}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default ConfirmStep;
