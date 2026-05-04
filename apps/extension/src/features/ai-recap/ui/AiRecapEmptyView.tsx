import { useLocale } from "@recap/i18n";

import RecapSection1Img from "@/shared/assets/imgs/recap-section-1.png";
import RecapSection2Img from "@/shared/assets/imgs/recap-section-2.png";
import { Divider } from "@/shared/ui";

const AiRecapEmptyView = () => {
  const { t } = useLocale("ai-recap");

  return (
    <div className="bg-white pt-4">
      <div className="flex flex-col px-5 pb-4">
        <p className="text-subtitle-2-rg text-gray-800">
          {t("screenTime.todayRecapTitle")}
        </p>
        <h2 className="text-headline-sb text-gray-900 mt-1">
          {t("empty.headlineLine1")}
        </h2>
        <h2 className="text-headline-sb text-gray-900">
          {t("empty.headlineLine2")}
        </h2>
      </div>
      <Divider />
      <div className="flex flex-col">
        <div className="pt-8 px-5 pb-6">
          <p className="text-subtitle-2-sb text-gray-500">01</p>
          <p className="text-subtitle-1-sb mt-1 text-gray-900">
            {t("preview.summarizeYourDay")}
          </p>
          <img
            src={RecapSection1Img}
            alt=""
            className="mt-4 block h-auto w-full max-w-full object-contain"
          />
        </div>

        <div className="mt-4 px-5 pb-6">
          <p className="text-subtitle-2-sb text-gray-500">02</p>
          <p className="text-subtitle-1-sb mt-1 text-gray-900">
            {t("preview.checkTopicsTimeline")}
          </p>
          <img
            src={RecapSection2Img}
            alt=""
            className="mt-4 block h-auto w-full max-w-full object-contain"
          />
          <p className="text-caption-1 text-gray-500 mt-4 text-center">
            {t("empty.recapDeliveryShort")}
          </p>
          <p className="text-caption-1 text-gray-500 text-center">
            {t("empty.changeDeliveryInSettings")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiRecapEmptyView;
