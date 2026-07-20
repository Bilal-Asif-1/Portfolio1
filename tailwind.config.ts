import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        paper: "#f4f3ef"
      },
      borderRadius: {
        card: "1.25rem",
        panel: "1.75rem"
      },
      boxShadow: {
        card: "0 1px 2px rgba(17, 17, 17, 0.04), 0 8px 24px rgba(17, 17, 17, 0.05)",
        lift: "0 2px 4px rgba(17, 17, 17, 0.04), 0 20px 48px rgba(17, 17, 17, 0.10)",
        deck: "0 10px 24px rgba(17, 17, 17, 0.12), 0 2px 6px rgba(17, 17, 17, 0.07)"
      },
      fontFamily: {
        sans: [
          "var(--font-hanken-grotesk)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)"
      }
    }
  },
  plugins: []
};

export default config;
