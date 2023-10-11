"use client"
import { useModalContext } from "@/app/context/ModalContext"
import { Avatar, Button } from "@nextui-org/react"
import React, { useEffect, useState } from 'react'
import {
  CloseBtn,
  SaveIcon,
  EditIcon,
  ArrowBack
} from "@/components/utils/icons/UpdateBtns"
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@nextui-org/react";
import { usePathname } from "next/navigation"

interface Inputs {
  username: string
}



const ProfileModalForm = () => {
  const {
    displayOn,
    setDisplayOn } = useModalContext()
  const [ isDismissable, setIsDismissable ] = useState<boolean>(false)
  const [ editUser, setEditUser ] = useState<boolean>(false)
  const pathname = usePathname()


  const image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

  const username = "joshua_Miguel_23"
  const email = "josephrbanaag51@gmail.com"

  // TODO: create a function that will trigger overlay click to close the modal window



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
  } = useForm<Inputs>({
    defaultValues: {
      username: ""
    },
    criteriaMode: "all",
    mode: "all"
  })

  const OnSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault()
    const newUsername = data.username

    const currentUsername = "joshuaMiguel_23"

    const updateData = async () => {
      try {
        const res = await fetch("api/users", {
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            newUsername,
            currentUsername
          })
        })

        if (!res.ok) {
          throw new Error("Invalid response.")
        }
      } catch (error) {
        throw new Error(`There was a problem sending the requested data to be updated. Error: ${error}`)
      }
    }
    updateData()
  }

  const UpdateUsername = () => {
    return (
      <>
        <button
          type="button"
          onClick={() => setEditUser(false)}
          className="font-bold absolute top-2 left-2 drop-shadow-xl transform hover:scale-105 hover:bg-foreground hover:border-foreground text-background/60 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 p-1">
          <ArrowBack className="w-4 h-4" />
        </button>
        <form
          onSubmit={handleSubmit(OnSubmit)}
          className="flex flex-col px-1">
          <Input
            autoComplete="off"
            aria-autocomplete="none"
            aria-labelledby="username"
            id="username"
            isClearable
            type="text"
            variant="underlined"
            className="!max-w-[200px] flex-1 text-default-100"
            {...register("username", {
              required: true,
              pattern: /[\w!@#$%^&*()-+=<>?/\\,.;:'"[\]{}|]{3,}/gi
            })}
            name="username"
          />
          <p className="formErrorMessage absolute top-[60px]">
            {errors.username?.types?.required && <span>Username is required</span>}
            {errors.username?.types?.pattern && <span>Space is not allowed and at least 3 characters</span>}
          </p>
          <button
            type="submit"
            className="absolute top-2 right-2"
          >
            <SaveIcon className="w-6 h-6 text-success-100 transform hover:scale-105 transition-all duration-300" />
          </button>
        </form>
      </>
    )
  }

  return (
    <>
      <div className="rounded-t-lg bg-foreground/60 shadow-md">
        <div className={`w-full h-[70px] rounded-t-lg  justify-center flex mb-1
          ${editUser
            ? "items-center"
            : "items-end"
          }
          `}>
          {editUser
            ? ""
            : <button
              type="button"
              onClick={() => setDisplayOn(false)}
              className="font-bold absolute top-2 right-2 drop-shadow-xl transform hover:scale-105 hover:bg-foreground hover:border-foreground text-background/70 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 ">
              <CloseBtn className="w-5 h-5" />
            </button>
          }
          <div className="px-3 overflow-hidden">
            {editUser
              ? <UpdateUsername />
              : <h1 className="text-default-900 text-2xl font-semibold drop-shadow-lg tracking-wider truncate ">{username}</h1>
            }
          </div>
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

          {/* 
              // TODO: add the state of this button to context for the form to receive the state value
             */}
          {editUser
            ? ""
            : <button
              type="button"
              onClick={() => setEditUser(!editUser)}
              className="absolute top-8 right-2 cursor-pointer">
              <EditIcon className="w-5 h-5 text-background/50 drop-shadow-xl transform hover:scale-105 hover:text-white transition-all duration-300" />
            </button>
          }
        </div>
      </div>
      <div className="mt-8 w-full flex flex-col justify-center gap-1 px-2 pt-6">
        <div className="mx-auto">
          <h1 className="text-xs text-foreground drop-shadow-md ">
            {email}
          </h1>
        </div>
      </div>
    </>
  )
}

export default ProfileModalForm