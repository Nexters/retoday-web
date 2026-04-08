export type AiRecapTimeLine = {
  startedAt: string;
  endedAt: string;
  title: string;
  durationMinutes: number;
};

export type AiRecapSection = {
  title: string;
  content: string;
};

export type AiRecapTopic = {
  keyword: string;
  title: string;
  content: string;
};

export type AiRecapResponse = {
  id: number;
  userId: number;
  recapDate: string;
  title: string;
  summary: string;
  imageUrl: string | null;
  startedAt: string;
  closedAt: string;
  sections: AiRecapSection[];

  timelines: AiRecapTimeLine[];
  topics: AiRecapTopic[];
};
