import type { StaticImageData } from "next/image";
import type { RecapImageType } from "@recap/api";

import RecapAiImg from "@/shared/assets/img/recap-ai.png";
import RecapBrowsingImg from "@/shared/assets/img/recap-browsing.png";
import RecapCategoryOnly1Img from "@/shared/assets/img/recap-category-only1.png";
import RecapCategoryOver5Img from "@/shared/assets/img/recap-category-over5.png";
import RecapCommunityImg from "@/shared/assets/img/recap-community.png";
import RecapContentImg from "@/shared/assets/img/recap-content.png";
import RecapDesignImg from "@/shared/assets/img/recap-design.png";
import RecapDevelopmentImg from "@/shared/assets/img/recap-development.png";
import RecapFinanceImg from "@/shared/assets/img/recap-finance.png";
import RecapGamingImg from "@/shared/assets/img/recap-gaming.png";
import RecapLifeImg from "@/shared/assets/img/recap-life.png";
import RecapNewsImg from "@/shared/assets/img/recap-news.png";
import RecapRandom1Img from "@/shared/assets/img/recap-random1.png";
import RecapRandom2Img from "@/shared/assets/img/recap-random2.png";
import RecapRandom3Img from "@/shared/assets/img/recap-random3.png";
import RecapScreenTimeOver12hImg from "@/shared/assets/img/recap-screen-time-over12h.png";
import RecapScreenTimeUnder1hImg from "@/shared/assets/img/recap-screen-time-under-1h.png";
import RecapShoppingImg from "@/shared/assets/img/recap-shopping.png";
import RecapStartAfter9pmImg from "@/shared/assets/img/recap-start-after-9pm.png";
import RecapStartBefore9amImg from "@/shared/assets/img/recap-start-before-9am.png";
import RecapStudyImg from "@/shared/assets/img/recap-study.png";

export const AI_RECAP_IMAGE: Record<RecapImageType, StaticImageData> = {
  STUDY: RecapStudyImg,
  SHOPPING: RecapShoppingImg,
  GAMING: RecapGamingImg,
  CONTENT: RecapContentImg,
  COMMUNITY: RecapCommunityImg,
  NEWS: RecapNewsImg,
  FINANCE: RecapFinanceImg,
  LIFE: RecapLifeImg,
  BROWSING: RecapBrowsingImg,
  DESIGN: RecapDesignImg,
  AI: RecapAiImg,
  DEVELOPMENT: RecapDevelopmentImg,
  SCREEN_TIME_OVER_12H: RecapScreenTimeOver12hImg,
  SCREEN_TIME_UNDER_1H: RecapScreenTimeUnder1hImg,
  CATEGORY_OVER_5: RecapCategoryOver5Img,
  CATEGORY_ONLY_1: RecapCategoryOnly1Img,
  START_AFTER_9PM: RecapStartAfter9pmImg,
  START_BEFORE_9AM: RecapStartBefore9amImg,
  RANDOM_1: RecapRandom1Img,
  RANDOM_2: RecapRandom2Img,
  RANDOM_3: RecapRandom3Img,
};
