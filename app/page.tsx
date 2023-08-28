import Image from 'next/image'
import { ThemeSwitcher } from "../components/ThemeSwitcher"
import React from "react";


export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center items-center gap-1 p-24 max-w-full min-h-screen">
      <ThemeSwitcher />
      <div className="flex flex-1 flex-col max-w-md max-h-lg border-2 rounded-2xl gap-2 p-10">
        <h1 className="text-2xl font-medium">Authentication Component</h1>
      </div>
    </main>


  )
}
