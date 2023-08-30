import SignIn from "@/components/forms/sign-in/page";
import Image from 'next/image'
import React from "react";


export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-1 flex-col justify-center items-center">
      <div className=" sm:p-2 p-5">
        <SignIn />
      </div>

    </main>


  )
}
