export const STEP_TITLES = [
  "정말 탈퇴하시겠어요?",
  "정말 탈퇴하시겠어요?",
  "회원 탈퇴 완료",
] as const;

export const ACCOUNT_REASON_LIST = [
  { value: "1", label: "자주 사용하지 않아요." },
  { value: "2", label: "개인정보 보호가 걱정돼요." },
  { value: "3", label: "브라우저 기록 수집이 부담스러워요." },
  { value: "4", label: "기록 수집이나 연동이 원활하지 않았어요." },
  { value: "5", label: "분석 결과가 충분히 유용하지 않았어요." },
  { value: "6", label: "기타" },
] as const;

export const INITIAL_DELETE_ACCOUNT_FORM = {
  reason: "",
  comment: "",
} as const;
