import SignIn from "@/components/forms/sign-in/page";
import Image from 'next/image'
import React from "react";


export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center items-center gap-1 p-24 max-w-full">
      <SignIn />
    </main>


  )
}
