"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { ChildrenProp } from "./Models/ChildrenProp";
import NextAuthProvider from "./auth/next-auth-provider";
import MaterialRTLProvider from "./Material/MaterialRTLProvider";

const ConvoProviders = ({ children }: ChildrenProp) => {
  return (
    <NextAuthProvider>
      <NextThemesProvider attribute="class">
        <MaterialRTLProvider>{children}</MaterialRTLProvider>
      </NextThemesProvider>
    </NextAuthProvider>
  );
};

export default ConvoProviders;

// Credits

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
