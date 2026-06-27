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
        paper: "#f4f3ef",
        mint: "#8ad9c0",
        coral: "#ef624f",
        cobalt: "#3024f5",
        butter: "#f4d84e"
      },
      boxShadow: {
        soft: "0 30px 90px rgba(17, 17, 17, 0.10)",
        card: "0 18px 45px rgba(17, 17, 17, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
