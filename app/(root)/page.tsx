"use client"
import Image from 'next/image'
import { Link } from "@nextui-org/react"
import { bgIllustration } from "@/components/constants"
import { Recursive, Dancing_Script } from "next/font/google"
import { motion } from "framer-motion"
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const recursive = Recursive({
  weight: [ "400", "700" ],
  subsets: [ "latin" ]
})

const dancing = Dancing_Script({
  weight: "400",
  subsets: [ "latin" ]
})


export default function Home() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/") {
      sessionStorage.clear();
    }
  }, [
    pathname
  ])

  return (
    <main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: .5 }}
        className="relative flex flex-col justify-center items-center min-h-screen delay-3000 z-10 gap-5 mt-5"
      >
        <Link
          href="/"
          className="sm:hidden block mainPageLogo mt-6">
          <p className={`${dancing.className} brandGradient flex items-center overflow-hidden drop-shadow-md`}>Authentication</p>
        </Link>
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
          <h1 className="sm:text-medium text-sm text-end drop-shadow-lg">Click <Link href="/sign-up" className="cursor-pointer text-[#FB542B] sm:text-medium text-sm font-semibold">Sign Up</Link> to create an account.</h1>
        </div>
        <div className="py-2 px-5 flex justify-center items-center mt-2">
          <h1 className="sm:text-sm text-xs text-end mr-1 drop-shadow-lg">Access your existing account? Click <Link href="/sign-in" className="text-[#FB542B] font-semibold sm:text-sm text-xs cursor-pointer">Sign In</Link></h1>
        </div>
      </motion.div>
    </main>

  )
}



