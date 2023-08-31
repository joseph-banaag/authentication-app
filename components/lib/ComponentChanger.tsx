"use client"
import React from 'react'
import SignUp from "@/components/lib/signOptions/SignUp";
import SignIn from "@/components/lib/signOptions/SignIn";
import { usePathname } from 'next/navigation'

export default function ComponentChanger() {
  const pathname = usePathname()

  // if React.ReactNode is not present the code will be unreachable
  const determineSignOption = (): React.ReactNode => {
    if (pathname === "/sign-in") {
      return (
        <SignUp />
      );
    } else if (pathname === "/sign-up") {
      return <SignIn />;
    } else {
      return <SignIn />;
    }
  };
  return (
    <>
      {determineSignOption()}
    </>
  )
}

