"use client";
import "@/app/globals.css";
import * as React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Topbar from "@/app/userComponents/section/navbar/Navbar";
import { ThemeProvider } from "@/app/(root)/providers";
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

export default function DashboardLayout({
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
              <div className="relative">
                <Topbar />
                {children}
              </div>
            </ModalContextProvider>
          </ThemeProvider>
        </React.StrictMode>
      </div>
    </div>
  );
}
