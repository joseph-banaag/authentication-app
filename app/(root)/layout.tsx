import '@/app/globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Topbar from "@/components/sections/navbar/page"
import Footer from "@/components/sections/footer/page"
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./providers"
import { UserContextProvider } from '@/app/context/UserContext'

const monserrat = Montserrat({
  display: "swap",
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'Authentication®',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en" className="dark" >
      <body className={monserrat.className}>
        <React.StrictMode>
          <ThemeProvider>
            <UserContextProvider>
              <Topbar />
              {children}
              <Footer />
            </UserContextProvider>
          </ThemeProvider>
        </React.StrictMode>
      </body>
    </html>
  )
}
