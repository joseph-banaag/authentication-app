import React from 'react'
import { bgIllustration } from "@/components/constants";
import { Image } from '@nextui-org/react';


const IllustrationSigUp = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col justify-center items-center p-10 z-0 mb-10 md:gap-11 gap-5">
        <h1 className="sm:text-2xl text-medium font-bold text-[#FB542B] drop-shadow-xl">Create connection</h1>
        <Image
          src={bgIllustration.connect.src}
          alt={bgIllustration.connect.name}
          width={400}
          height={400}
        />
      </div>
    </>
  )
}

export default IllustrationSigUp