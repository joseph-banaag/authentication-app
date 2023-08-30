"use client"
import Image from 'next/image'
import { Link } from "@nextui-org/react"
import { bgIllustration } from "@/components/constants"

export default function Home() {


  return (
    <div className="relative flex flex-col justify-center items-center h-screen delay-3000 z-10  gap-5 -mt-20">
      <div className='bg-fixed bg-center bg-cover z-[1]'>
        <Image
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
        <h1 className="sm:text-medium text-sm text-end">Click <Link href="/sign-up" className="text-secondary font-semibold underline underline-offset-4">Sign Up</Link> to create an account: </h1>
      </div>
    </div>


  )
}



