"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useLocale } from "@recap/i18n";
import { Grid } from "@recap/ui";

import LoginBanner from "@/entities/login/ui/LoginBanner";
import EmptyRecapImg1 from "@/shared/assets/img/empty-reacp-1.png";
import EmptyRecapImg2 from "@/shared/assets/img/empty-recap-2.png";

const PreviewImage = ({ src, alt }: { src: StaticImageData; alt: string }) => {
  return (
    <div className="h-56 w-full overflow-hidden rounded-[1.25rem] md:h-140">
      <Image
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        priority={false}
      />
    </div>
  );
};

const AiRecapUnloginPage = () => {
  const { t } = useLocale("ai-recap");

  return (
    <div className="flex flex-col gap-4 md:gap-5 xl:gap-7">
      <LoginBanner />

      <div className="rounded-[1.25rem] bg-white px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-heading-md text-blue-400">
              {t("screenTime.todayRecapTitle")}
            </p>
            <h2 className="text-title-1 md:text-display-2 leading-tight text-gray-900">
              {t("screenTime.deliverRecapDailyNight")}
            </h2>
          </div>

          <div className="flex items-start justify-between gap-6 border-t border-solid border-gray-100 pt-4 md:justify-start md:gap-8 md:border-0 md:pt-0">
            <div className="min-w-26 space-y-1 md:w-26">
              <p className="text-subtitle-2-rg text-gray-500">
                {t("screenTime.totalScreenTime")}
              </p>
              <p className="text-heading-rg text-gray-900">-</p>
            </div>
            <div className="h-14 w-px bg-gray-200" />
            <div className="min-w-26 space-y-1 md:w-26">
              <p className="text-subtitle-2-rg text-gray-500">
                {t("screenTime.measurementTime")}
              </p>
              <p className="text-heading-rg text-gray-900">-</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.25rem] bg-white px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8">
        <p className="text-heading-rg text-gray-800">
          {t("preview.recapProvidedInThisFormat")}
        </p>

        <Grid
          cols={{ base: 1, md: 2 }}
          gap="none"
          className="mt-6 gap-4 md:mt-9 md:gap-9"
        >
          <div>
            <PreviewImage src={EmptyRecapImg1} alt="" />
            <p className="text-body-1 md:text-headline-sb mt-3 text-gray-600 md:mt-4">
              {t("preview.summarizeYourDay")}
            </p>
          </div>

          <div>
            <PreviewImage src={EmptyRecapImg2} alt="" />
            <p className="text-body-1 md:text-headline-sb mt-3 text-gray-600 md:mt-4">
              {t("preview.checkTopicsTimeline")}
            </p>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default AiRecapUnloginPage;
