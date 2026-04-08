import { useEffect } from "react";
import browser from "webextension-polyfill";

import type {
  ExtensionMessage,
  MessageType,
} from "@/entities/history/model/messages.type";

function useBrowserMessage<T extends MessageType>(
  type: T,
  handler: (message: Extract<ExtensionMessage, { type: T }>) => void,
) {
  useEffect(() => {
    const listener = (
      message: unknown,
      _sender: browser.Runtime.MessageSender,
    ) => {
      const msg = message as ExtensionMessage;
      if (msg.type === type) {
        handler(msg as Extract<ExtensionMessage, { type: T }>);
      }
    };

    browser.runtime.onMessage.addListener(listener);

    return () => {
      browser.runtime.onMessage.removeListener(listener);
    };
  }, [type, handler]);
}

export default useBrowserMessage;
