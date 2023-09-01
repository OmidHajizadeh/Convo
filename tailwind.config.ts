import type { Config } from "tailwindcss";

const config: Config = {
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
        "convo-blue": "#1fe5f2",
        "convo-gray": "#d4d4d4",
        primary: "#1f1f1f",
        secondary: "#707070",
        success: "#d4d4d4",
        error: "#dc3545",
        info: "#17a2b8",
        warning: "#ffc107",
      },
    },
  },
  plugins: [],
};
export default config;
