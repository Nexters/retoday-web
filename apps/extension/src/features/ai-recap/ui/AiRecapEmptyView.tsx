import RecapSection1Img from "@/shared/assets/imgs/recap-section-1.png";
import RecapSection2Img from "@/shared/assets/imgs/recap-section-2.png";
import { Divider } from "@/shared/ui";

const AiRecapEmptyView = () => {
  return (
    <div className="bg-white pt-4">
      <div className="flex flex-col px-5 pb-4">
        <p className="text-subtitle-2-rg text-gray-800">Today’s Recap</p>
        <h2 className="text-headline-sb text-gray-900 mt-1">매일밤 오늘의</h2>
        <h2 className="text-headline-sb text-gray-900">
          인터넷 리캡을 배달해드려요
        </h2>
      </div>
      <Divider />
      <div className="flex flex-col">
        <div className="pt-8 px-5 pb-6">
          <p className="text-subtitle-2-sb text-gray-500">01</p>
          <p className="text-subtitle-1-sb mt-1 text-gray-900">
            오늘 하루가 어떤 하루였는지 요약해드려요
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
            관심 있었던 주제, 하루 타임라인을 확인해요
          </p>
          <img
            src={RecapSection2Img}
            alt=""
            className="mt-4 block h-auto w-full max-w-full object-contain"
          />
          <p className="text-caption-1 text-gray-500 mt-4 text-center">
            활동데이터가 쌓이는 날이면 밤 12시에 리캡을 배달해드려요.
          </p>
          <p className="text-caption-1 text-gray-500 text-center">
            리캡 배송 시간은 설정창에서 변경 가능해요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiRecapEmptyView;
