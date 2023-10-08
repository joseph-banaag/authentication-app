import { Image } from '@nextui-org/react'
import React from 'react'
import { bgIllustration } from "@/components/constants";

const IllustrationSignIn = () => {
  return (
    <>
      <div className="illustrationContainer">
        <div className="p-8">
          <h1 className="illustrationHeader">Connect with the community</h1>
        </div>
        <div className="illustration">
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
