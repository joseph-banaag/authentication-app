import { Image } from '@nextui-org/react'
import React from 'react'
import { Company } from "@/components/constants";

const BrandLogoSignIn = () => {
  return (
    <>
      <div className='w-full flex md:h-[8em] sm:h-[6em] h-[5em] justify-start mt-2 md:px-5 sm:px-3 px-1'>
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

      <div className="py-3 px-2">
        <h1 className="sm:text-4xl text-xl sm:font-medium font-normal mb-1 drop-shadow-xl">Sign in</h1>
        <p className="sm:text-medium text-xs sm:font-normal font-small drop-shadow-md">to access {Company.name} </p>
      </div>
    </>
  )
}

export default BrandLogoSignIn


// md:px-5 sm:px-4 px-2