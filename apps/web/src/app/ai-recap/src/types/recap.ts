export type RecapSection = {
  title: string;
  content: string;
};

export type RecapTimeline = {
  startedAt: string;
  endedAt: string;
  title: string;
  durationMinutes: number;
};

export type RecapTopic = {
  keyword: string;
  title: string;
  content: string;
};

export type NormalizedRecap = {
  id: number;
  userId: number;
  recapDate: string;
  title: string;
  summary: string;
  startedAt: Date;
  closedAt: Date;
  sections: RecapSection[];
  timelines: RecapTimeline[];
  topics: RecapTopic[];
};
