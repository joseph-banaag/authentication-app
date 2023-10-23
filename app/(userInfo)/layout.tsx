"use client";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import * as React from "react";
import { ThemeProvider } from "@/app/(root)/providers";
import Sidebar from "@/app/userComponents/section/sidebar/Sidebar";
import ModalContextProvider from "@/app/context/ModalContext";

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

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element | null {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div className="text-foreground bg-background">
      <div className={monserrat.className}>
        <React.StrictMode>
          <ThemeProvider>
            <ModalContextProvider>
              <div className="flex relative">
                <Sidebar />
                {children}
              </div>
            </ModalContextProvider>
          </ThemeProvider>
        </React.StrictMode>
      </div>
    </div>
  );
}
