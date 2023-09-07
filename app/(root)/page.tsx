"use client"
import Image from 'next/image'
import { Button, Link } from "@nextui-org/react"
import { bgIllustration } from "@/components/constants"
import { Recursive, Dancing_Script } from "next/font/google"
import { motion } from "framer-motion"

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
    <main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 0.25 }}
      >
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
            <h1 className="sm:text-medium text-sm text-end drop-shadow-md">Click <Link href="/sign-up" className="cursor-pointer text-[#FB542B] sm:text-medium text-sm font-semibold">Sign Up</Link> to create an account.</h1>
          </div>
          <div className="py-2 px-5 flex justify-center items-center mt-2">
            <h1 className="sm:text-sm text-xs text-end mr-1 drop-shadow-md">To access your existing account? Click <Link href="/sign-in" className="text-[#FB542B] font-semibold sm:text-sm text-xs cursor-pointer">Sign In</Link></h1>
          </div>
        </div>
      </motion.div>
    </main>

  )
}



