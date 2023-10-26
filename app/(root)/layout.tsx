"use client";
import "@/app/globals.css";
import { Montserrat } from "next/font/google";
import Topbar from "@/components/sections/navbar/Navbar";
import Footer from "@/components/sections/footer/page";
import * as React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/app/(root)/providers";
import ModalContextProvider from "@/app/context/ModalContext";

const monserrat = Montserrat({
  display: "swap",
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element | null {
  const [client, setClient] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setClient(true);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const storedTheme = {
    data: typeof window !== "undefined" ? localStorage.getItem("theme") : "",
  };
  const currentTheme = storedTheme.data;

  return (
    <div
      className={`dark ${
        client
          ? currentTheme === "dark" || !currentTheme
            ? "darkThemeBg"
            : "lightThemeBg"
          : "dark"
      }`}
    >
      <div className={monserrat.className}>
        <React.StrictMode>
          <ThemeProvider>
            <ModalContextProvider>
              <Topbar />
              {children}
              <Footer />
            </ModalContextProvider>
          </ThemeProvider>
        </React.StrictMode>
      </div>
    </div>
  );
}
