import React from 'react'
import { bgIllustration } from "@/components/constants";
import { Image } from '@nextui-org/react';


const IllustrationSigUp = () => {
  return (
    <>
      <div className="illustrationContainer">
        <h1 className="illustrationHeader">Create connections</h1>
        <div className="illustration">
          <Image
            src={bgIllustration.connect.src}
            alt={bgIllustration.connect.name}
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

export default IllustrationSigUp