'use client'
import React, { useEffect, useState } from "react"
import { bgIllustration } from "@/components/constants"
import { Image } from "@nextui-org/react"

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  const [ isClient, setIsClient ] = useState<boolean>(false)

  useEffect(() => {
    console.error(error)
    setIsClient(true)
  }, [ error ])
  return (
    <>
      <div className="bg-[#0a0316] text-[#ECEDEE] flex flex-1 w-full h-screen justify-center items-center gap-8 flex-col">
        <h2 className="text-4xl text-[#ecedee] font-bold">
          {isClient ? "Something went wrong!" : ""}
        </h2>
        <Image
          src={bgIllustration.errorNotFound.src}
          alt={bgIllustration.errorNotFound.name}
          width={600}
          height={600}
          style={{
            objectFit: "cover"
          }}
          className='fadeIn'
        />
        <button onClick={() => location.reload()} className="bg-[#661fe0] px-5 py-2 rounded-2xl text-xl font-semibold">Try again</button>
      </div>
    </>
  )
}