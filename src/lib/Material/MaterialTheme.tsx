import { useTheme, ThemeProvider as NextThemesProvider } from "next-themes";
import {
  createTheme,
  ThemeProvider as MaterialThemeProvider,
} from "@mui/material/styles";
import { useMemo } from "react";
import { ChildrenProp } from "../Models/ChildrenProp";

const MaterialTheme = ({ children }: ChildrenProp) => {
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
    <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
  );
};

export default MaterialTheme;
