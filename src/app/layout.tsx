import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import NextAuthProvider from "@/lib/auth/next-auth-provider";
import ConvoThemeProviders from "@/lib/Material/ConvoThemeProviders";
import ServiceWorkerSetup from "@/lib/ServiceWorkerSetup";

export const metadata: Metadata = {
  title: "کانوو",
  description: "Convo Chat App",
  applicationName: "Convo",
  creator: "Omid Hajizadeh",
  manifest: "/manifest-assets/manifest.json",
  themeColor: "#78b5d5",
  icons: {
    apple: "/logo.png",
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
};

const mainFont = localFont({
  src: [
    {
      path: "../fonts/IRANYekanX-Thin.woff2",
      weight: "100",
    },
    {
      path: "../fonts/IRANYekanX-UltraLight.woff2",
      weight: "200",
    },
    {
      path: "../fonts/IRANYekanX-Light.woff2",
      weight: "300",
    },
    {
      path: "../fonts/IRANYekanX-Regular.woff2",
      weight: "normal",
    },
    {
      path: "../fonts/IRANYekanX-Medium.woff2",
      weight: "500",
    },
    {
      path: "../fonts/IRANYekanX-DemiBold.woff2",
      weight: "600",
    },
    {
      path: "../fonts/IRANYekanX-Bold.woff2",
      weight: "bold",
    },
    {
      path: "../fonts/IRANYekanX-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "../fonts/IRANYekanX-Black.woff2",
      weight: "900",
    },
    {
      path: "../fonts/IRANYekanX-ExtraBlack.woff2",
      weight: "950",
    },
    {
      path: "../fonts/IRANYekanX-Heavy.woff2",
      weight: "1000",
    },
  ],
  variable: "--font-main",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="light"
      style={{ colorScheme: "light" }}
    >
      <body
        className={`${mainFont.variable} font-main font-regular bg-white dark:bg-gray-800`}
      >
        <NextAuthProvider>
          <ConvoThemeProviders>
            {children}
            <Toaster />
            <ServiceWorkerSetup />
          </ConvoThemeProviders>
        </NextAuthProvider>
      </body>
    </html>
  );
}
