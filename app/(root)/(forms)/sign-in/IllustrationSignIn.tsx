import { Image } from '@nextui-org/react'
import React from 'react'
import { bgIllustration } from "@/components/constants";

const IllustrationSignIn = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col justify-center items-center p-10 z-0 mb-10 md:gap-11 gap-5">
        <h1 className="sm:text-2xl text-medium font-bold text-[#FB542B] drop-shadow-xl">Connect with the community</h1>
        <Image
          src={bgIllustration.group.src}
          alt={bgIllustration.group.name}
          width={400}
          height={400}
        />
      </div>
    </>
  )
}

export default IllustrationSignIn