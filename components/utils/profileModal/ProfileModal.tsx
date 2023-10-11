"use client"
import { useModalContext } from "@/app/context/ModalContext"
import React from 'react'
import ProfileModalForm from "@/components/utils/profileModal/ProfileModalForm"


const ProfileModal = () => {
  const {
    displayOn,
  } = useModalContext()

  return (
    <>
      <div
        className={`absolute z-50 top-5 xl:right-[15%] lg:right-28 md:right-14 right-7 rounded-lg w-[280px] p-1 shadow-xl bg-default/60 
        ${displayOn
            ? "fadeIn"
            : "fadeOut"}
            `}
      >
        <ProfileModalForm />
        <div className="w-full flex flex-col justify-center gap-1 px-2 py-3">
          <hr className="border-default/90"/>
          <h1 className="text-xs">
            Current theme
         </h1>
        </div>
      </div>
    </>
  )
}

export default ProfileModal
