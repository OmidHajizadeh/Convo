"use client";

import { useEffect, useState } from "react";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { ChildrenProp } from "../Models/ChildrenProp";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CacheProvider } from "@emotion/react";
import MaterialTheme from "./MaterialTheme";

const cacheRtl = createCache({
  key: "mui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ConvoThemeProviders = ({ children }: ChildrenProp) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <NextThemesProvider attribute="class" enableSystem={false}>
      <CacheProvider value={cacheRtl}>
        <MaterialTheme>{children}</MaterialTheme>
      </CacheProvider>
    </NextThemesProvider>
  );
};

export default ConvoThemeProviders;

// Credit

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
