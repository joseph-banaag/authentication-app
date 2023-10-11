"use client"
import { useModalContext } from "@/app/context/ModalContext"
import React, { useState } from 'react'
import ProfileModalForm from "@/components/utils/profileModal/ProfileModalForm"
import { usePathname } from "next/navigation"


const ProfileModal = () => {
  const {
    displayOn,
  } = useModalContext()
  const [ email, setEmail ] = useState<string>("")
  const pathname = usePathname()

  const getData = async () => {
    const res = await fetch("api/users")
    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }
    return res.json()
  }

  const userDetail = async () => {
    const dataFromDB = await getData()

    const storedUsername = {
      data: typeof window !== "undefined"
        ? sessionStorage.getItem("username")
        : ""
    }
    const username = `${storedUsername.data}`

    const userInfo = dataFromDB.find((obj: { username: string }) => obj.username === username)

    if (!userInfo) return null

    const email = userInfo.email
    if (pathname === "/dashboard") {
      setEmail(email)
    }
  }
  userDetail();

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
        <div className="mt-8 w-full flex flex-col justify-center gap-1 px-2 pt-6">
          <div className="mx-auto">
            <h1 className="text-xs text-foreground drop-shadow-md ">
              {email}
            </h1>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center gap-1 px-2 py-3">
          <hr className="border-default/90" />
          <h1 className="text-xs">
            Current theme
          </h1>
        </div>
      </div>
    </>
  )
}

export default ProfileModal
