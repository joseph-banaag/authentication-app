"use client"
import { useModalContext } from "@/app/context/ModalContext"
import { Avatar } from "@nextui-org/react"
import React, { useState } from 'react'
import {
  CloseBtn,
  SaveIcon,
  EditIcon
} from "@/components/utils/icons/UpdateBtns"
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@nextui-org/react";



const ProfileModal = () => {
  const {
    displayOn,
    setDisplayOn } = useModalContext()
  const [ isDismissable, setIsDismissable ] = useState<boolean>(false)
  const [ editUser, setEditUser ] = useState<boolean>(false)

  // TODO: create a function that will trigger overlay click to close the modal window

  const handleEditUsername = () => {
    setEditUser(!editUser)
    console.log("edit username")
  }

  const handleUpdateUser = () => {
    setEditUser(false)
    console.log("username updated successfully!")
  }

  const handleEditProfileImg = () => {
    console.log("profile image updated successfully!")
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: ""
    },
    criteriaMode: "all",
    mode: "all"
  })


  const image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

  const username = "joshua_Miguel_23"

  return (
    <>
      <div
        className={`absolute z-50 top-5 xl:right-[15%] lg:right-28 md:right-14 right-7 rounded-lg w-[280px] p-1 shadow-xl bg-foreground/30 
        ${displayOn
            ? "fadeIn"
            : "fadeOut"}
            `}
      >
        <div className="rounded-t-lg bg-foreground/60 shadow-md ">
          <div className="w-full h-[70px] rounded-t-lg flex justify-center items-end px-2 relative ">
            <button
              type="button"
              onClick={() => setDisplayOn(false)}
              className="font-bold absolute top-2 right-2 drop-shadow-xl transform hover:scale-105 hover:bg-foreground hover:border-foreground text-background/70 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 ">
              <CloseBtn className="w-5 h-5" />
            </button>
            {editUser
              ? <div className="flex h-[50px] items-end gap-1 px-1">
                <Input
                  type="text"
                  variant="underlined"
                  defaultValue={username}
                  classNames={{
                    inputWrapper: "mb-1 text-background/50"
                  }}
                />
              </div>
              : <h1 className="text-default-900 text-2xl font-semibold drop-shadow-lg tracking-wider">{username}</h1>
            }

          </div>
          <div className="w-full h-[60px] relative">
            <div className="w-24 h-24 relative mx-auto">
              <Avatar
                showFallback
                radius="full"
                isFocusable
                src={image}
                className="cursor-pointer w-24 h-24"
              />
              <div>
                <button
                  type="button"
                  onClick={handleEditProfileImg}
                  className="absolute -bottom-3 right-[50%] translate-x-[50%] cursor-pointer z-50">
                  <EditIcon className="w-5 h-5 text-white drop-shadow-xl transform hover:scale-105 hover:text-default bg-default hover:bg-default-600 transition-all duration-300 rounded-full p-[2px]" />
                </button>
              </div>
            </div>

            {editUser
              ? <button
                onClick={handleUpdateUser}
                type="button"
                className="absolute top-8 right-2 cursor-pointer"
              >
                <SaveIcon className="w-6 h-6 text-success-100" />
              </button>
              : <button
                type="button"
                onClick={handleEditUsername}
                className="absolute top-8 right-2 cursor-pointer">
                <EditIcon className="w-5 h-5 text-background/50 drop-shadow-xl transform hover:scale-105 hover:text-white transition-all duration-300" />
              </button>
            }
          </div>
        </div>
        <div className="mt-8 w-full flex flex-col justify-center gap-1 px-2 py-6">
          <div className="mx-auto">
            <h1 className="text-xs text-default-700 drop-shadow-md">
              joshua_miguel_23@gmail.com
            </h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileModal
