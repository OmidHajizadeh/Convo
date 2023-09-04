"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useTheme } from "next-themes";
import { useMemo } from "react";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function MaterialRTLProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const theme = useMemo(
    () =>
      createTheme({
        direction: "rtl",
        typography: {
          fontFamily: "var(--font-main)",
        },

        palette: {
          mode: resolvedTheme as "light" | "dark",
          primary: {
            main: resolvedTheme === "light" ? "#141414" : "#2b2b2b",
            light: resolvedTheme === "light" ? "#14141480" : "#2b2b2b80",
            dark: resolvedTheme === "light" ? "#14141490" : "#2b2b2b90",
          },
          secondary: {
            main: resolvedTheme === "light" ? "#e5e5e5" : "#7c7c7c",
            light: resolvedTheme === "light" ? "#e5e5e580" : "#7c7c7c80",
          },
          success: {
            main: resolvedTheme === "light" ? "#64bf6a" : "#56a35a",
          },
          error: {
            main: resolvedTheme === "light" ? "#e50404" : "#cc0404",
          },
          info: {
            main: resolvedTheme === "light" ? "#17a2b8" : "#148b9e",
          },
          warning: {
            main: resolvedTheme === "light" ? "#ffc107" : "#e5ad06",
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
      }),
    [resolvedTheme]
  );

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
