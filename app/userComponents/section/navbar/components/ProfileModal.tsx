"use client"
import { useModalContext } from "@/app/context/ModalContext"
import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes"
import ProfileModalForm from "@/app/userComponents/section/navbar/components/ProfileModalForm"


const ProfileModal = (): React.ReactNode => {
  const {
    displayOn,
  } = useModalContext()
  const [ email, setEmail ] = useState<string>("")
  const { theme } = useTheme()

  const getData = async () => {
    const res = await fetch("http://localhost:3000/api/users", {
      cache: "force-cache"
    })
    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }
    return res.json()
  }

  const userDetail = async () => {
    const dataFromDB = await getData()

    const storedUsername = {
      data: typeof window !== "undefined"
        ? sessionStorage.getItem("sessionName")
        : ""
    }
    const currentUsername = `${storedUsername.data}`

    const userInfo = dataFromDB.find(({ username }: { username: string }) => username === currentUsername)

    if (!userInfo) return null

    const email = userInfo.email
    setEmail(email)
  }
  userDetail();

  return (
    <>
      <div
        className={`profileModalContainer
        ${displayOn
            ? "fadeIn"
            : "fadeOut"}
            `}
      >
        <ProfileModalForm />
        <div className="profileModalEmailContainer">
          <div className="mx-auto">
            <h1 className="profileModalEmailContent">
              {email}
            </h1>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center gap-1 px-2 py-3">
          <hr className="border-default/90" />
          <div className="flex gap-2">
            <h1 className="text-xs">
              Current theme:
            </h1>
            <p className="xSmallTextColor capitalize">{theme}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileModal