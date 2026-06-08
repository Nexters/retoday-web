"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useLocale } from "@recap/i18n";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Grid,
} from "@recap/ui";

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

const AiRecapPreviewCard = () => {
  const { t } = useLocale("ai-recap");

  return (
    <Card className="flex w-full flex-col gap-0 rounded-[1.25rem] bg-white px-5 py-5 shadow-none md:px-6 md:py-6 xl:px-9 xl:py-8">
      <CardHeader className="shrink-0 p-0">
        <CardTitle className="text-heading-rg text-gray-800">
          {t("preview.recapProvidedInThisFormat")}
        </CardTitle>
      </CardHeader>

      <CardContent className="min-h-0 min-w-0 flex-1 flex-col p-0">
        <Grid
          cols={{ base: 1, md: 2 }}
          gap="none"
          className="mt-6 gap-4 md:mt-9 md:gap-9"
        >
          <div className="flex min-w-0 flex-col flex-nowrap items-stretch gap-0 bg-transparent">
            <PreviewImage src={EmptyRecapImg1} alt="" />
            <CardDescription className="text-body-1 md:text-headline-sb m-0 mt-3 text-gray-600 md:mt-4">
              {t("preview.summarizeYourDay")}
            </CardDescription>
          </div>

          <div className="flex min-w-0 flex-col flex-nowrap items-stretch gap-0 bg-transparent">
            <PreviewImage src={EmptyRecapImg2} alt="" />
            <CardDescription className="text-body-1 md:text-headline-sb m-0 mt-3 text-gray-600 md:mt-4">
              {t("preview.checkTopicsTimeline")}
            </CardDescription>
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { AiRecapPreviewCard };
