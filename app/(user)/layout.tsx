"use client"
import '@/app/globals.css'
import * as React from "react";
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Topbar from "@/app/userComponents/section/navbar/Navbar";
import { ThemeProvider } from "@/app/(root)/providers"
import { useTheme } from "next-themes";

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
          ? "darkThemeBg text-foreground"
          : "lightThemeBg text-white"
        : "dark"
        }`}>

      <body className={monserrat.className}>
        <React.StrictMode>
          <ThemeProvider>
            <div className="relative">
              <Topbar />
              {children}
            </div>
          </ThemeProvider>
        </React.StrictMode>
      </body>
    </html>
  )
}
