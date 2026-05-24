/** @type {import('tailwindcss').Config} */
const preset = {
  safelist: [
    {
      pattern: /^(sm:|md:|lg:|xl:)?grid-cols-(?:1[0-2]|[1-9])$/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"IBM Plex Sans KR"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Noto Sans KR",
          "Apple SD Gothic Neo",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "gradient-01": "var(--gradient-01)",
        "gradient-02": "var(--gradient-02)",
        "gradient-03": "var(--gradient-03)",
        "gradient-04": "var(--gradient-04)",
        "gradient-05": "var(--gradient-05)",
        "gradient-06": "var(--gradient-06)",
      },
      colors: {
        gray: {
          75: "var(--color-gray-75)",
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)",
        },
        blue: {
          50: "var(--color-blue-50)",
          75: "var(--color-blue-75)",
          100: "var(--color-blue-100)",
          200: "var(--color-blue-200)",
          300: "var(--color-blue-300)",
          400: "var(--color-blue-400)",
          500: "var(--color-blue-500)",
        },
        positive: {
          DEFAULT: "var(--color-positive)",
        },
        cautionary: {
          DEFAULT: "var(--color-cautionary)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
        },
      },
      fontSize: {
        "display-1": [
          "2.5rem",
          {
            lineHeight: "3.25rem",
            letterSpacing: "-0.002em",
            fontWeight: "600",
          },
        ],
        "display-2": [
          "2.25rem",
          { lineHeight: "3rem", letterSpacing: "-0.002em", fontWeight: "600" },
        ],
        "display-3": [
          "2rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "-0.002em",
            fontWeight: "600",
          },
        ],
        "title-1": [
          "1.75rem",
          {
            lineHeight: "2.375rem",
            letterSpacing: "-0.024em",
            fontWeight: "600",
          },
        ],
        "title-2": [
          "1.5rem",
          { lineHeight: "2rem", letterSpacing: "-0.002em" },
        ],
        "heading-sb": [
          "1.375rem",
          { lineHeight: "2rem", letterSpacing: "-0.002em", fontWeight: "600" },
        ],
        "heading-md": [
          "1.375rem",
          { lineHeight: "2rem", letterSpacing: "-0.004em", fontWeight: "500" },
        ],
        "heading-rg": [
          "1.375rem",
          { lineHeight: "2rem", letterSpacing: "-0.004em" },
        ],
        "headline-sb": [
          "1.25rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "headline-md": [
          "1.25rem",
          { lineHeight: "1.75rem", letterSpacing: "0em", fontWeight: "500" },
        ],
        "headline-rg": [
          "1.25rem",
          { lineHeight: "1.75rem", letterSpacing: "0em" },
        ],
        "subtitle-1-sb": [
          "1.125rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "-0.004em",
            fontWeight: "600",
          },
        ],
        "subtitle-1-md": [
          "1.125rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "-0.002em",
            fontWeight: "500",
          },
        ],
        "subtitle-2-sb": [
          "0.9375rem",
          {
            lineHeight: "1.5625rem",
            letterSpacing: "-0.004em",
            fontWeight: "600",
          },
        ],
        "subtitle-2-rg": [
          "0.9375rem",
          { lineHeight: "1.5625rem", letterSpacing: "-0.004em" },
        ],
        "body-1": [
          "1.125rem",
          { lineHeight: "1.875rem", letterSpacing: "0.0057em" },
        ],
        "body-2": ["1rem", { lineHeight: "1.625rem", letterSpacing: "0em" }],
        "body-3": ["0.875rem", { lineHeight: "1.5rem", letterSpacing: "0em" }],
        "label-1": [
          "1rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "0.0057em",
            fontWeight: "600",
          },
        ],
        "label-2": [
          "0.875rem",
          {
            lineHeight: "1.125rem",
            letterSpacing: "0.0057em",
            fontWeight: "600",
          },
        ],
        "caption-1": [
          "0.75rem",
          { lineHeight: "1rem", letterSpacing: "0.0057em" },
        ],
      },
      boxShadow: {
        gnb: "0px 1.26px 2.53px -1.26px rgba(0,0,0,0.10), 0px 1.26px 3.79px 0px rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [],
};

export default preset;
