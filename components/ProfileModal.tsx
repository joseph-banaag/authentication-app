"use client"
import { useModalContext } from "@/app/(userInfo)/context/ModalContext"
import { Avatar } from "@nextui-org/react"
import React, { useState } from 'react'

const ProfileModal = () => {
  const {
    displayOn,
    setDisplayOn } = useModalContext()
  const [ isDismissable, setIsDismissable ] = useState<boolean>(false)

  // TODO: create a function that will trigger overlay click to close the modal window

  const image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

  const userName = "Joseph Banaag"

  return (
    <>
      <div
        className={`absolute z-50 top-5 xl:right-40 lg:right-28 md:right-14 right-7 rounded-lg w-[420px] h-[620px]  p-1 shadow-xl bg-background/30 shadow-background/50 
        ${displayOn
            ? "fadeIn"
            : "fadeOut"}
            `}
      >
        <div className="rounded-t-lg bg-[#320b01]">
          <div className="w-full h-[60px] rounded-t-lg flex justify-center items-end p-2 relative">
            <button
              type="button"
              onClick={() => setDisplayOn(false)}
              className="font-bold absolute top-3 right-3 drop-shadow-xl text-foreground hover:text-background hover:bg-foreground transform scale-105 p-1 rounded-full w-7 h-7 flex justify-center items-center cursor-pointer transition-all duration-300">
              x
            </button>
            <h1 className="text-white text-2xl font-semibold drop-shadow-xl">{userName}</h1>
          </div>
          <div className="w-full h-[60px]">
            <Avatar
              showFallback
              radius="full"
              isFocusable
              src={image}
              className="cursor-pointer w-24 h-24 mx-auto"
            />
          </div>
        </div>


      </div>
    </>
  )
}

export default ProfileModal

{/*

<Avatar
        showFallback
        radius="full"
        isFocusable
        src={image}
        className="cursor-pointer sm:w-9 w-7 sm:h-9 h-7"
      />

*/}