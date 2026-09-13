import { z } from "zod";

const DOMAIN_LABEL_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const IPV4_PATTERN = /^(?:\d{1,3}\.){3}\d{1,3}$/;

export const excludedDomainErrorCodes = [
  "empty",
  "whitespace",
  "tooLong",
  "scheme",
  "path",
  "noDot",
  "emptyLabel",
  "labelHyphenStart",
  "labelHyphenEnd",
  "invalidCharacters",
  "ipAddress",
] as const;

export type ExcludedDomainErrorCode = (typeof excludedDomainErrorCodes)[number];

export const isExcludedDomainErrorCode = (
  value: string,
): value is ExcludedDomainErrorCode =>
  excludedDomainErrorCodes.includes(value as ExcludedDomainErrorCode);

export const excludedDomainSchema = z
  .string()
  .superRefine((raw, ctx) => {
    const addIssue = (code: ExcludedDomainErrorCode) => {
      ctx.addIssue({
        code: "custom",
        message: code,
      });
    };

    if (!raw) {
      addIssue("empty");
      return;
    }

    if (raw !== raw.trim()) {
      addIssue("whitespace");
      return;
    }

    const value = raw.toLowerCase();

    if (value.length > 255) {
      addIssue("tooLong");
      return;
    }

    if (value.includes("://")) {
      addIssue("scheme");
      return;
    }

    if (/[/:?#]/.test(value)) {
      addIssue("path");
      return;
    }

    if (!value.includes(".")) {
      addIssue("noDot");
      return;
    }

    const labels = value.split(".");

    if (labels.some((label) => label.length === 0)) {
      addIssue("emptyLabel");
      return;
    }

    for (const label of labels) {
      if (label.startsWith("-")) {
        addIssue("labelHyphenStart");
        return;
      }

      if (label.endsWith("-")) {
        addIssue("labelHyphenEnd");
        return;
      }
    }

    if (labels.some((label) => label.includes("_"))) {
      addIssue("invalidCharacters");
      return;
    }

    if ([...value].some((char) => char.charCodeAt(0) > 127)) {
      addIssue("invalidCharacters");
      return;
    }

    if (IPV4_PATTERN.test(value)) {
      addIssue("ipAddress");
      return;
    }

    if (!/^[a-z0-9.-]+$/.test(value)) {
      addIssue("invalidCharacters");
      return;
    }

    if (!labels.every((label) => DOMAIN_LABEL_PATTERN.test(label))) {
      addIssue("invalidCharacters");
    }
  })
  .transform((raw) => raw.toLowerCase());

export const excludedDomainFormSchema = z.object({
  domain: excludedDomainSchema,
});

export type ExcludedDomainFormInput = z.input<typeof excludedDomainFormSchema>;
export type ExcludedDomainFormOutput = z.output<
  typeof excludedDomainFormSchema
>;
