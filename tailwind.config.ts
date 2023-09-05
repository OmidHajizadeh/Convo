import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // important: true,
  theme: {
    fontWeight: {
      thin: "100",
      ultraLight: "200",
      light: "300",
      regular: "normal",
      medium: "500",
      semiBold: "600",
      bold: "bold",
      extraBold: "800",
      black: "900",
      extraBlack: "950",
      heavy: "1000",
    },
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        main: ["var(--font-main)"],
      },
      backgroundImage: {
        "landing-wave-lines": "url('/landing-page/landing-wave-lines.svg')",
        "chat-pattern": "url('/chat-bg.webp')",
      },
      colors: {
        primary: {
          light: "#141414",
          dark: "#2b2b2b",
        },
        secondary: {
          light: "#e5e5e5",
          dark: "#7c7c7c",
        },
        success: {
          light: "#64bf6a",
          dark: "#56a35a",
        },
        error: {
          light: "#e50404",
          dark: "#cc0404",
        },
        info: {
          light: "#17a2b8",
          dark: "#148b9e",
        },
        warning: {
          light: "#ffc107",
          dark: "#e5ad06",
        },
      },
    },
  },
  plugins: [],
};
export default config;
