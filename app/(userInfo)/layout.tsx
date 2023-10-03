import '@/app/globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import * as React from "react";
import { ThemeProvider } from "@/app/(root)/providers"
import Sidebar from "@/app/userComponents/section/sidebar/Sidebar";

const monserrat = Montserrat({
  display: "swap",
  weight: "400",
  subsets: [ "latin" ],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'Authentication®',
  description: 'An authentication provider',
}


export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en" className="dark" >
      <body className={monserrat.className}>
        <React.StrictMode>
          <ThemeProvider>
            <div className="flex relative">
              <Sidebar />
              {children}
            </div>
          </ThemeProvider>
        </React.StrictMode>
      </body>
    </html>
  )
}
