import { Image } from '@nextui-org/react'
import React from 'react'
import { Company } from "@/components/constants";

const BrandLogoSignUp = () => {
  return (
    <>
      <div className="formBrandContainer">
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
        <h1 className="formSignHeader">Create your account</h1>
        <p className="formSignText">to access {Company.name} </p>
      </div>
    </>
  )
}

export default BrandLogoSignUp