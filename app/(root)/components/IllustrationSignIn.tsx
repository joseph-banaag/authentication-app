import { Image } from '@nextui-org/react'
import React from 'react'
import { bgIllustration } from "@/components/constants";

const IllustrationSignIn = () => {
  return (
    <>
      <div className="w-full min-h-[400px]">
        <div className="p-8">
          <h1 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-lg font-bold text-[#FB542B] drop-shadow-2xl flex flex-1 justify-center items-center mx-auto">Connect with the community</h1>
        </div>
        <div className="xl:w-[500px] xl:h-[500px] lg:w-[450px] lg:h-[450px] sm:w-[350px] sm:h-[350px] w-[300px] h-[300px] mx-auto">
          <Image
            src={bgIllustration.group.src}
            alt={bgIllustration.group.name}
            width={600}
            height={600}
            style={{
              objectFit: "cover"
            }}
          />
        </div>
      </div>
    </>
  )
}

export default IllustrationSignIn
