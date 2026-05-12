/**
 * 빌드 타임에 인라인되는 `NODE_ENV` 기반의 실행 모드 플래그
 */
export const isProd = process.env.NODE_ENV === "production";
export const isDev = !isProd;
