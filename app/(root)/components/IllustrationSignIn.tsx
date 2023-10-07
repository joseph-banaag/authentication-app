import { Image } from '@nextui-org/react'
import React from 'react'
import { bgIllustration } from "@/components/constants";

const IllustrationSignIn = () => {
  return (
    <>
      <div className="xl:flex-col lg:flex md:flex justify-center items-center z-0 mb-10 md:gap-11 xl:gap-5 gap-1 xl:pe-16 w-full h-screen ">
        <h1 className="xl:text-5xl lg:text-4xl text-medium font-bold text-[#FB542B] drop-shadow-2xl subpixel-antialiased flex flex-wrap justify-center items-center mx-auto">Connect with the community</h1>
        <Image
          src={bgIllustration.group.src}
          alt={bgIllustration.group.name}
          width={500}
          height={500}
        />
      </div>
    </>
  )
}

export default IllustrationSignIn
