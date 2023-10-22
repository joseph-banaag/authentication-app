import React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const monserrat = Montserrat({
  display: "swap",
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Authentication®",
  description: "An authentication provider",
};

const NotFoundLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return (
    <html lang="en">
      <body className={monserrat.className}>{children}</body>
    </html>
  );
};

export default NotFoundLayout;
