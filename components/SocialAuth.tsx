import React from 'react'
import Image from 'next/image';
import { iconsSrc } from "@/components/constants";
import GithubLight from "@/components/lib/iconOptions/githubLight";
import { Button } from "@nextui-org/react";

// TODO: setup nextAuth here...

export default function SocialAuth(): React.ReactNode {
  return (
    <>
      <div className="flex items-center justify-evenly gap-[3px]">
        <div>
          <Button
            variant="flat"
            size="md"
            className="formSocialButton"
          >
            <Image
              priority
              src={iconsSrc.facebook}
              alt={iconsSrc.nameFb}
              width={24}
              height={24}
              style={{
                objectFit: "contain",
                width: "24px",
                height: "24px"

              }}
              className="drop-shadow-md"
            />
          </Button>
        </div>

        <div>
          <Button
            variant="flat"
            size="md"
            className="formSocialButton"
          >
            <GithubLight />
          </Button>
        </div>

        <div>
          <Button
            variant="flat"
            size="md"
            className="formSocialButton"
          >
            <Image
              priority
              src={iconsSrc.google}
              alt={iconsSrc.nameG}
              width={24}
              height={24}
              style={{
                objectFit: "contain",
                width: "24px",
                height: "24px"
              }}
              className="drop-shadow-md"
            />
          </Button>
        </div>
      </div>

      <div className="formSocialDividerContainer">
        <hr className='formSocialHorzLine'></hr>
        <p className="formSocialDivText">or</p>
        <hr className='formSocialHorzLine'></hr>
      </div>
    </>
  )
}
