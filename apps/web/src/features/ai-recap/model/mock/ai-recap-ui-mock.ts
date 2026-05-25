import type { NormalizedRecap } from "@/features/ai-recap/model/recap.type";

export const getMockAiRecapData = (date: string): NormalizedRecap => ({
  id: 1,
  userId: 1,
  recapDate: date,
  title: "생산성과 탐색 사이를 오간 하루",
  summary:
    "오전에는 업무 도구 위주로 시간을 썼고, 오후에는 쇼핑·뉴스 탐색 비중이 늘었습니다.",
  imageUrl: null,
  startedAt: new Date(`${date}T09:00:00`),
  closedAt: new Date(`${date}T22:30:00`),
  sections: [
    {
      title: "업무 집중 구간",
      content: "슬랙, 문서, 이슈 트래커 사용이 오전에 집중됐습니다.",
    },
    {
      title: "탐색·쇼핑 구간",
      content: "점심 이후 쇼핑과 뉴스 사이트 체류가 길어졌습니다.",
    },
  ],
  timelines: [
    {
      startedAt: "07:30",
      endedAt: "08:00",
      title: "아침 뉴스·날씨",
      durationMinutes: 30,
    },
    {
      startedAt: "09:00",
      endedAt: "11:30",
      title: "업무 도구",
      durationMinutes: 150,
    },
    {
      startedAt: "11:45",
      endedAt: "12:30",
      title: "점심 메뉴 검색",
      durationMinutes: 45,
    },
    {
      startedAt: "13:00",
      endedAt: "15:20",
      title: "쇼핑·뉴스",
      durationMinutes: 140,
    },
    {
      startedAt: "15:30",
      endedAt: "16:45",
      title: "기술 블로그·문서",
      durationMinutes: 75,
    },
    {
      startedAt: "17:00",
      endedAt: "18:10",
      title: "이슈 트래커·코드 리뷰",
      durationMinutes: 70,
    },
    {
      startedAt: "18:20",
      endedAt: "19:00",
      title: "커뮤니티·SNS",
      durationMinutes: 40,
    },
    {
      startedAt: "19:10",
      endedAt: "19:50",
      title: "레시피·요리 영상",
      durationMinutes: 40,
    },
    {
      startedAt: "20:00",
      endedAt: "22:00",
      title: "동영상·스트리밍",
      durationMinutes: 120,
    },
    {
      startedAt: "22:10",
      endedAt: "22:40",
      title: "내일 일정 정리",
      durationMinutes: 30,
    },
  ],
  topics: [
    {
      keyword: "생산성",
      title: "업무 도구 사용",
      content: "문서와 이슈 관리 도구에서 체류 시간이 가장 길었습니다.",
    },
    {
      keyword: "쇼핑",
      title: "쇼핑 탐색",
      content: "할인·리뷰 페이지를 중심으로 여러 사이트를 비교했습니다.",
    },
    {
      keyword: "뉴스",
      title: "뉴스 읽기",
      content: "기술·경제 뉴스 헤드라인 위주로 짧게 여러 번 방문했습니다.",
    },
  ],
});
