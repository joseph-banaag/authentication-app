import { Image } from '@nextui-org/react'
import React from 'react'
import { Company } from "@/components/constants";

const BrandLogoSignUp = () => {
  return (
    <>
      <div className='w-full flex md:h-[8em] sm:h-[6em] h-[5em] justify-start mt-2'>
        <Image
          src={Company.imgSrc}
          alt={Company.name}
          width={100}
          height={100}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%"
          }}
          className="drop-shadow-md"
        />
      </div>
      <div className='py-3 px-2'>
        <h1 className="sm:text-4xl text-xl sm:font-medium font-normal mb-1 drop-shadow-xl">Create your account</h1>
        <p className="sm:text-medium text-xs sm:font-normal font-small drop-shadow-md">to access {Company.name} </p>
      </div>
    </>
  )
}

export default BrandLogoSignUp