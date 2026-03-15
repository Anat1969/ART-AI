import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0F",
        accent: "#C8F542",
        "accent-dim": "#a8d032",
        surface: "#13131A",
        border: "#1E1E2E",
        muted: "#6B6B8A",
        foreground: "#E8E8F0",
      },
      fontFamily: {
        heebo: ["Heebo", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      gridTemplateColumns: {
        "gallery-sm": "repeat(1, minmax(0, 1fr))",
        "gallery-md": "repeat(2, minmax(0, 1fr))",
        "gallery-lg": "repeat(4, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
