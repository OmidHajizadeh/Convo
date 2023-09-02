"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "var(--font-main)",
  },
  palette: {
    primary: {
      main: "#1f1f1f",
    },
    secondary: {
      main: "#707070",
    },
    success: {
      main: "#d4d4d4",
    },
    error: {
      main: "#dc3545",
    },
    info: {
      main: "#17a2b8",
    },
    warning: {
      main: "#ffc107",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export default function MaterialRTLProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}


const consoleHead = [
  "color: yellow",
  "text-align: center",
  "width: 100%",
  "display: block",
  "text-shadow: 2px 2px black",
  "padding: 10px",
].join(";");
const consoleBody = [
  "color: #78b5d5",
  "text-align: center",
  "width: 100%",
  "margin-block: -2.5rem -1.5rem",
  "display: block",
  "font-family:  Lucida Handwriting",
  "font-size: 45px",
  "font-weight: 1000",
  "text-shadow: 4px 4px black",
  "padding: 10px",
].join(";");
const consoleFooter = [
  "color: lime",
  "text-align: center",
  "width: 100%",
  "display: block",
  "text-shadow: 2px 2px black",
  "padding: 10px",
].join(";");

console.log(
  "%cCreated by\n%cOmid Hajizadeh\n%cContact me at omid.hajizadehh@gmail.com",
  consoleHead,
  consoleBody,
  consoleFooter
);
