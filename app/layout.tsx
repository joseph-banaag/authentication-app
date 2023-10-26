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

export const metadata: Metadata = {
  title: "Authentication®",
  description: "An authentication provider",
  keywords: "authentication, sign in, sign up, login, logout",
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="dark text-foreground bg-background"
    >
      <body className={monserrat.className}>
        <React.StrictMode>
          <ThemeProvider>{children}</ThemeProvider>
        </React.StrictMode>
      </body>
    </html>
  );
};

export default RootLayout;
