import type { PageSnapshot } from "@/entities/history/model/storage.type";

export const MESSAGE_TYPE = {
  PAGE_VISITED: "PAGE_VISITED",
  GOOGLE_LOGIN: "GOOGLE_LOGIN",
  AUTH_CHANGED: "AUTH_CHANGED",
} as const;

export type MessageType = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE];

export type PageVisitedMessage = {
  type: typeof MESSAGE_TYPE.PAGE_VISITED;
  data: PageSnapshot;
};

export type GoogleLoginMessage = {
  type: typeof MESSAGE_TYPE.GOOGLE_LOGIN;
};

export type AuthChangedMessage = {
  type: typeof MESSAGE_TYPE.AUTH_CHANGED;
};

export type ExtensionMessage =
  | PageVisitedMessage
  | GoogleLoginMessage
  | AuthChangedMessage;
