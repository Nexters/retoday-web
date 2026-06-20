"use client";

import { Button, DialogFooter } from "@recap/ui";

type DoneStepProps = {
  onClose: () => void;
};

const DoneStep = ({ onClose }: DoneStepProps) => (
  <div className="flex flex-col justify-center px-5 pt-4 pb-5">
    <span className="text-body-2 text-center text-gray-900">
      지금까지 리투데이를 이용해주셔서 감사합니다.
    </span>

    <DialogFooter className="mt-6 flex items-center">
      <Button type="button" onClick={onClose}>
        확인하기
      </Button>
    </DialogFooter>
  </div>
);

export default DoneStep;
