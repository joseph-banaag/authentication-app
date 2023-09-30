import '@/app/globals.css'
import * as React from "react";
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Topbar from "@/app/(user)/userComponents/section/navbar/page";
import { ThemeProvider } from "@/app/(user)/providers";
import { DataContextProvider } from '@/app/context/UserContext'

const monserrat = Montserrat({
  display: "swap",
  weight: "400",
  subsets: [ "latin" ],
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
    <html suppressHydrationWarning lang="en" className="dark">
      <body className={monserrat.className}>
        <React.StrictMode>
          <ThemeProvider>
            <DataContextProvider>
              <Topbar />
              {children}
            </DataContextProvider>
          </ThemeProvider>
        </React.StrictMode>
      </body>
    </html>
  )
}
