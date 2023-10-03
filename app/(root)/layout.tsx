import '@/app/globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Topbar from "@/components/sections/navbar/Navbar"
import Footer from "@/components/sections/footer/page"
import * as React from "react";
import { ThemeProvider } from "@/app/(root)/providers"

const monserrat = Montserrat({
  display: "swap",
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'Authentication®',
  description: 'An authentication provider',
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
              <Topbar />
              {children}
              <Footer />
          </ThemeProvider>
        </React.StrictMode>
      </body>
    </html>
  )
}
