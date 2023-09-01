"use client"
import Image from 'next/image'
import { Link } from "@nextui-org/react"
import { bgIllustration } from "@/components/constants"
import { Recursive, Dancing_Script } from "next/font/google"

const recursive = Recursive({
  weight: ["400", "700"],
  subsets: ["latin"]
})

const dancing = Dancing_Script({
  weight: "400",
  subsets: ["latin"]
})


export default function Home() {

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen delay-3000 z-10 gap-5 mt-5">
      <Link href="/" color="foreground" className="text-3xl font-semibold -mt-32 sm:hidden flex "><span className={`${dancing.className} text-secondary font-bold`}>Auth</span><span className={`${dancing.className}`}>entication</span></Link>
      <div className='bg-fixed bg-center bg-cover z-[1]'>
        <Image
          priority
          src={bgIllustration.homepage.src}
          alt={bgIllustration.homepage.name}
          width={600}
          height={600}
          style={{
            objectFit: "cover"
          }}
          className='fade-in-bg'
        />
      </div>
      <div className="py-2 px-5 flex justify-center">
        <h1 className="sm:text-medium text-sm text-end">Click <Link href="/sign-up" className="text-secondary sm:text-medium text-sm font-semibold underline underline-offset-4">Sign Up</Link> to create an account: </h1>
      </div>
    </div>


  )
}



