export const STEP_TITLE_KEYS = ["confirm", "confirm", "done"] as const;

export const ACCOUNT_REASON_LIST = [
  "rarelyUse",
  "privacyConcern",
  "historyCollectionUncomfortable",
  "syncOrCollectionIssues",
  "analysisNotUseful",
  "other",
] as const;

export const INITIAL_DELETE_ACCOUNT_FORM = {
  reason: "",
  comment: "",
} as const;
