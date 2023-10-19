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


export default function Home(): JSX.Element | null {
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
        className="mainRootPage"
      >
        <Link
          href="/"
          className="sm:hidden flex">
          <p className={`${dancing.className} brandGradient flex items-center overflow-hidden drop-shadow-md mx-auto`}>Authentication</p>
        </Link>
        <div className='bg-fixed bg-center bg-cover z-[1] mt-5'>
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
        <div className="mainRootPageHeaderContainer">
          <div className="mainRootPageHeaderWrapper">
            <h1 className="mainRootPageHeader1">Click <Link href="/sign-up" className="mainRootPageLinks mainRootPageHeader1">Sign Up</Link> to create an account</h1>
          </div>
          <div className="mainRootPageHeaderWrapper">
            <h2 className="mainRootPageHeader2">Access your existing account? Click <Link href="/sign-in" className="mainRootPageLinks mainRootPageHeader2">Sign In</Link></h2>
          </div>
        </div>
      </motion.div>
    </main>
  )
}



