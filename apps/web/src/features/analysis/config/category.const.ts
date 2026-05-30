import type { CategoryType } from "@recap/api";

export const CATEGORY_LABEL = {
  STUDY: "category.study",
  SHOPPING: "category.shopping",
  GAMING: "category.gaming",
  CONTENT: "category.content",
  COMMUNITY: "category.community",
  NEWS: "category.news",
  FINANCE: "category.finance",
  LIFE: "category.life",
  BROWSING: "category.browsing",
  DESIGN: "category.design",
  DEVELOPMENT: "category.development",
  AI: "category.ai",
  ETC: "category.etc",
} satisfies Record<CategoryType, string>;
