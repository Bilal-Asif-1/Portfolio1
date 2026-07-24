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
        lift: "0 2px 4px rgba(17, 17, 17, 0.04), 0 20px 48px rgba(17, 17, 17, 0.10)"
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
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};

export default config;
