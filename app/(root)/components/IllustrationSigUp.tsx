import React from 'react'
import { bgIllustration } from "@/components/constants";
import { Image } from '@nextui-org/react';


const IllustrationSigUp = () => {
  return (
    <>
      <div className="xl:flex-col lg:flex md:flex-row justify-center items-center z-0 mb-10 md:gap-11 gap-5">
        <h1 className="sm:text-5xl text-medium font-bold text-[#FB542B] drop-shadow-2xl subpixel-antialiased">Create connections</h1>
        <Image
          src={bgIllustration.connect.src}
          alt={bgIllustration.connect.name}
          width={600}
          height={600}
        />
      </div>
    </>
  )
}

export default IllustrationSigUp