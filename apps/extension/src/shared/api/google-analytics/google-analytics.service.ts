import browser from "webextension-polyfill";

const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const GA_DEBUG_ENDPOINT = "https://www.google-analytics.com/debug/mp/collect";

// Get via https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
  | string
  | undefined;
const API_SECRET = import.meta.env.VITE_GA_API_SECRET as string | undefined;
const DEFAULT_ENGAGEMENT_TIME_MSEC = 100;

// Duration of inactivity after which a new session is created
const SESSION_EXPIRATION_IN_MIN = 30;

type GaEventParams = Record<string, string | number | undefined>;

type GaRequestBody = {
  client_id: string;
  events: Array<{
    name: string;
    params: GaEventParams;
  }>;
};

class Analytics {
  debug: boolean;

  constructor(debug = false) {
    this.debug = debug;
  }

  get isConfigured(): boolean {
    return Boolean(MEASUREMENT_ID && API_SECRET);
  }

  get endpoint() {
    return this.debug ? GA_DEBUG_ENDPOINT : GA_ENDPOINT;
  }

  getRandomId() {
    const digits = "123456789".split("");
    let result = "";

    for (let i = 0; i < 10; i++) {
      result += digits[Math.floor(Math.random() * 9)];
    }

    return result;
  }

  // Returns the client id, or creates a new one if one doesn't exist.
  // Stores client id in local storage to keep the same client id as long as
  // the extension is installed.
  async getOrCreateClientId() {
    let { clientId } = await chrome.storage.local.get("clientId");

    if (!clientId) {
      // Generate a unique client ID, the actual value is not relevant.
      // We use the <number>.<number> format since this is typical for GA client IDs.
      const unixTimestampSeconds = Math.floor(new Date().getTime() / 1000);
      clientId = `${this.getRandomId()}.${unixTimestampSeconds}`;
      await chrome.storage.local.set({ clientId });
    }

    return clientId;
  }

  // Returns the current session id, or creates a new one if one doesn't exist or
  // the previous one has expired.
  async getOrCreateSessionId() {
    // Use storage.session because it is only in memory
    let { sessionData } = await browser.storage.session.get("sessionData");
    const currentTimeInMs = Date.now();

    // Check if session exists and is still valid
    if (sessionData && sessionData.timestamp != null) {
      const lastMs = Number(sessionData.timestamp);
      const durationInMin = (currentTimeInMs - lastMs) / 60000;

      // Check if last update lays past the session expiration threshold
      if (durationInMin > SESSION_EXPIRATION_IN_MIN) {
        // Clear old session id to start a new session
        sessionData = null;
      } else {
        // Update timestamp to keep session alive
        sessionData.timestamp = currentTimeInMs;
        await browser.storage.session.set({ sessionData });
      }
    }

    if (!sessionData) {
      // Create and store a new session
      sessionData = {
        session_id: currentTimeInMs.toString(),
        timestamp: currentTimeInMs,
      };
      await browser.storage.session.set({ sessionData });
    }

    return sessionData.session_id;
  }

  getRequestUrl() {
    return `${this.endpoint}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;
  }

  // Fires an event with optional params. Event names must only include letters and underscores.
  async fireEvent(name: string, params: GaEventParams = {}) {
    if (!this.isConfigured) {
      return;
    }

    const payload: GaEventParams = { ...params };

    // Configure session id and engagement time if not present
    if (!payload.session_id) {
      payload.session_id = await this.getOrCreateSessionId();
    }

    if (!payload.engagement_time_msec) {
      payload.engagement_time_msec = DEFAULT_ENGAGEMENT_TIME_MSEC;
    }

    const requestBody: GaRequestBody = {
      client_id: await this.getOrCreateClientId(),
      events: [
        {
          name,
          params: payload,
        },
      ],
    };

    const url = this.getRequestUrl();

    try {
      if (this.debug) {
        console.groupCollapsed("[Analytics MOCK]");
        console.log("endpoint:", url);
        console.log("event:", name);
        console.log("payload:", requestBody);
        console.groupEnd();
        return;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();

      if (!response.ok) {
        console.error("Google Analytics request failed", {
          status: response.status,
          statusText: response.statusText,
          body: responseText,
        });
      }
    } catch (e) {
      console.error("Google Analytics request failed with an exception", e);
    }
  }

  // Fire a page view event.
  async firePageViewEvent(
    pageTitle: string,
    pageLocation: string,
    additionalParams: GaEventParams = {},
  ) {
    return this.fireEvent("page_view", {
      page_title: pageTitle,
      page_location: pageLocation,
      ...additionalParams,
    });
  }

  // Fire an error event.
  async fireErrorEvent(
    error: GaEventParams,
    additionalParams: GaEventParams = {},
  ) {
    // Note: 'error' is a reserved event name and cannot be used
    return this.fireEvent("extension_error", {
      ...error,
      ...additionalParams,
    });
  }
}
const isDev = import.meta.env.MODE === "development";
export default new Analytics(isDev);
