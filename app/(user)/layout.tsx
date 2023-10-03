import '@/app/globals.css'
import * as React from "react";
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Topbar from "@/app/userComponents/section/navbar/Navbar";
import { ThemeProvider } from "@/app/(root)/providers"

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


export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en" className="dark">
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
