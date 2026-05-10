"use strict";

/**
 * next-i18next–style shared config (aligned with cal.diy packages/i18n).
 *
 * Do not set `i18n: this.i18n` inside Next.js `next.config` when using the
 * App Router — Next 16 treats it as the Pages Router locale prefix and will
 * break prerender (`/ko/...` routes). Keep locale routing in middleware /
 * `[locale]` segments if needed; this file remains the single source for
 * locale lists + paths for `next-i18next` helpers and `@recap/i18n/server`.
 */

const path = require("node:path");

const defaultLocale = "ko";
const locales = ["ko", "en", "ja"];

/**
 * Shared Next.js / next-i18next–style config (see cal.diy packages/i18n).
 * Use `i18n` in `next.config` for routing defaults; use `localePath` with
 * next-i18next helpers or `@recap/i18n/server` for App Router RSC.
 */
module.exports = {
  i18n: {
    defaultLocale,
    locales,
  },
  fallbackLng: {
    default: [defaultLocale],
  },
  reloadOnPrerender: process.env.NODE_ENV !== "production",
  localePath: path.resolve(__dirname, "src/locales"),
  defaultNS: "landing",
  ns: ["ai-recap", "analysis", "common", "landing", "settings"],
};
