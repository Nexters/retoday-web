import Image from "next/image";

import AIRecapIcon from "@/assets/icons/recap-ai.svg";
import RecapImg from "@/assets/img/recap-1.png";

const RecapSummary = () => {
  return (
    <div className="rounded-[1.25rem] bg-white">
      <div className="p-10">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <p className="text-heading-md text-blue-400">Today’s Recap</p>
            <h2 className="text-display-2 text-gray-900">
              집중적인 연구의 하루
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-38 space-y-1">
              <p className="text-subtitle-2-rg text-gray-500">총 스크린타임</p>
              <p className="text-heading-rg text-gray-900">5시간 35분</p>
            </div>

            <div className="h-18 w-px bg-gray-200" />

            <div className="w-38 space-y-1">
              <p className="text-subtitle-2-rg text-gray-500">측정시간</p>
              <p className="text-heading-rg text-gray-900">08am - 12pm</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-4 rounded-full bg-blue-50 px-2.5 py-2">
          <div className="flex items-center gap-2">
            <AIRecapIcon />
            <p className="text-subtitle-1-sb text-gray-900">하루 요약</p>
          </div>

          <p className="text-body-2 text-gray-800">
            취업준비와 개발공부를 병행하며 열심히 앞으로 나아갔어요. 앞으로도
            꾸준히 작업하다보면 원하는 결과를 얻을 수 있을거에요!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_464px] border-t border-solid border-gray-100">
        <div>
          <div className="pt-6 pr-9 pb-13 pl-10">
            <p className="text-subtitle-2-sb text-gray-500">01</p>
            <p className="text-headline-sb mt-1 text-gray-900">
              개발하며 고군분투한 하루
            </p>
            <p className="text-body-1 mt-4 text-gray-900">
              오늘은 주로 개발과 학습에 집중하셨네요. 오전 10시부터 오후 3시까지
              가장 활발한 활동을 보였으며, 오늘은 주로 개발과 학습에
              집중하셨네요.
            </p>
          </div>

          <div className="border-t border-solid border-gray-200 pt-6 pr-9 pb-13 pl-10">
            <p className="text-subtitle-2-sb text-gray-500">02</p>
            <p className="text-headline-sb mt-1 text-gray-900">
              업무 효율화를 위한 여정
            </p>
            <p className="text-body-1 mt-4 text-gray-900">
              AI와 피그마를 연결하거나, 디자인 시스템 정비를 위한 MCP(Model
              Context Protocol) 활용법 등 최신 AI 툴을 업무에 녹여내려
              노력했어요.
            </p>
          </div>
        </div>

        <Image src={RecapImg} alt="recapImg" width={464} height={420} />
      </div>
    </div>
  );
};

export default RecapSummary;
