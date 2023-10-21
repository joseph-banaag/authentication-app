"use client";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import * as React from "react";
import { ThemeProvider } from "@/app/(root)/providers";

const monserrat = Montserrat({
  display: "swap",
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

const metadata: Metadata = {
  title: "Authentication®",
  description: "An authentication provider",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element | null {
  const [client, setClient] = React.useState<boolean>(false);
  React.useEffect(() => {
    setClient(true);
  }, []);

  const storedTheme = {
    data: typeof window !== "undefined" ? localStorage.getItem("theme") : "",
  };
  const currentTheme = storedTheme.data;

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`dark ${
        client
          ? currentTheme === "dark" || !currentTheme
            ? "darkThemeBg"
            : "lightThemeBg"
          : "dark"
      }`}
    >
      <body className={monserrat.className}>
        <React.StrictMode>
          <ThemeProvider>{children}</ThemeProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
