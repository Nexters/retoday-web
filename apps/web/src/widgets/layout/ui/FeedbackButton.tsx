"use client";

import { useState } from "react";
import { useLocale } from "@recap/i18n";
import {
  Button,
  cn,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  TextArea,
} from "@recap/ui";

import { RoundButton } from "@/shared/ui";

const FeedbackButton = () => {
  const { t } = useLocale("landing");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error(data.message);
        return;
      }

      setContent("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <RoundButton className="group" aria-haspopup="dialog">
          <div className="py-1.5 pr-1 pl-2.5">
            <p className="text-subtitle-2-rg text-gray-900">
              {t("sendFeedback")}
            </p>
          </div>
        </RoundButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b border-solid border-gray-200">
          <DialogTitle>{t("sendFeedback")}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="flex flex-col gap-2 p-5">
          <span className="text-body-2 text-gray-900">
            {t("feedback.contentLabel")}
          </span>
          <TextArea
            rows={8}
            placeholder={t("feedback.placeholder")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <DialogFooter className={cn("p-5", "pt-0")}>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
          >
            {t("feedback.submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackButton;
