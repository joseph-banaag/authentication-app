"use client"
import '@/app/globals.css'
import * as React from "react";
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Topbar from "@/app/userComponents/section/navbar/Navbar";
import { ThemeProvider } from "@/app/(root)/providers"
import { useTheme } from "next-themes";
import ModalContextProvider from "@/app/context/ModalContext";

const monserrat = Montserrat({
  display: "swap",
  weight: "400",
  subsets: [ "latin" ],
  variable: "--font-sans"
});

const metadata: Metadata = {
  title: 'Authentication®',
  description: 'An authentication provider',
}


export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [ client, setClient ] = React.useState<boolean>(false)
  React.useEffect(() => {
    setClient(true)
  }, [])

  const storedTheme = {
    data: typeof window !== "undefined"
      ? localStorage.getItem("theme")
      : ""
  }
  const currentTheme = storedTheme.data

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`dark ${client
        ? currentTheme === "dark" || !currentTheme
          ? "darkThemeBg"
          : "lightThemeBg"
        : "dark"
        }`}
    >

      <body className={monserrat.className}>
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
      </body>
    </html>
  )
}
