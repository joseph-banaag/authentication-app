"use client"
import React, { useEffect, useState } from 'react'
import { EditIcon } from "@/components/utils/icons/UpdateBtns";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { useForm, SubmitHandler } from "react-hook-form"
import { creationDate } from "@/components/lib/createdDate"



const getData = async () => {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "force-cache"
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

interface Inputs {
  password: string;
}

const UserInfoCard = () => {
  const pathname = usePathname()
  const [ mounted, setMounted ] = useState<boolean>(false)
  const [ username, setUsername ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")
  const [ id, setId ] = useState<string>("")
  const [ createdOn, setCreatedOn ] = useState<string>("")
  const [ showPass, setShowPass ] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [
    setMounted
  ])
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>();

  if (!mounted) return null

  const storedUser = {
    data: typeof window !== "undefined"
      ? sessionStorage.getItem("username")
      : ""
  }

  const user_name = `${storedUser.data}`

  const completeUserDetail = async () => {
    const data = await getData()

    const userInformation = data.find(({ username }: { username: string }) =>
      username === user_name)

    if (!userInformation) return null

    const _id = userInformation._id
    const _username = userInformation.username
    const _email = userInformation.email
    const _password = userInformation.password
    const _createdOn = userInformation.created_on

    setUsername(_username)
    setEmail(_email)
    setPassword(_password)
    setId(_id)
    setCreatedOn(_createdOn)

  }
  completeUserDetail()

  const passwordLength = password.length
  const maskedPassword = "*".repeat(passwordLength)



  const handledUpdateUserInfo = () => {
    const updated_on = `${creationDate}`

    console.log(updated_on)
    console.log("UserInfo updated successfully!")


    {/* 
  // TODO: update: username, password, email, and add new data. updated_on.
    // once the update is completed the database will receive the updated files + new file called updated_on:
    username
    email
    password
    updated_on
  */}
  }

  const OnSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault()
    console.log(data)
  }

  const handleShowPassword = () => {

    console.log("the password are matched!")

    {/* 
  // TODO: create a function that will ask user to put the password first before viewing the current password 

  add the setPassword here if the logic of checking current password and user provided password is correct
  */}

  }
  return (
    <>
      <div className="profileUpdateInfoContentWrapper laptopL:flex-row">

        <div className="w-full flex flex-col border pb-1 rounded-[9px] border-foreground/30 ">
          <ul className="w-full border border-collapse border-foreground/30 rounded-t-lg p-0 ">

            <li className="profileUpdateInfoItems">
              <div className="text-xs font-medium tracking-wide textColor flex justify-start items-center">
                Username:
              </div>
              <div className="text-sm text-foreground/90 min-w-[100px] truncate">
                {username}
              </div>
            </li>
            <div className="w-full flex justify-end">
              <hr className="w-[95%] border-foreground/30" />
            </div>

            <li className="profileUpdateInfoItems">
              <div className="text-xs font-medium tracking-wide textColor flex justify-start items-center">
                Email:
              </div>
              <div className="text-sm text-foreground/90 min-w-[100px] truncate">
                {email}
              </div>
            </li>
            <div className="w-full flex justify-end">
              <hr className="w-[95%] border-foreground/30" />
            </div>

            <li className="profileUpdateInfoItems">
              <div className="text-xs font-medium tracking-wide textColor flex justify-start items-center">
                Password:
              </div>
              <div
                onClick={() => setShowPass(!showPass)}
                className="flex justify-between items-center gap-1">
                <p className="text-sm text-foreground/90 min-w-[100px] truncate flex items-center">
                  {showPass
                    ? password
                    : maskedPassword
                  }
                </p>

                {showPass
                  ? <EyeFilledIcon className="text-foreground/80 w-[24px] h-[24px]" />
                  : <EyeSlashFilledIcon
                    onClick={handleShowPassword}
                    className="text-foreground/80 w-[24px] h-[24px]" />
                }
              </div>

            </li>
            <div className="w-full flex justify-end">
              <hr className="w-[95%] border-foreground/30" />
            </div>

            <li className="profileUpdateInfoItems">
              <div className="text-xs font-medium tracking-wide textColor flex justify-start items-center">
                Created on:
              </div>
              <div className="text-sm text-foreground/90 min-w-[100px] truncate">
                {createdOn}
              </div>
            </li>
          </ul>
          <div className="flex justify-center items-center pt-1">
            <div
              onClick={handledUpdateUserInfo}
              className="profileUpdateInfoBtn">
              <EditIcon className="profileUpdateEditIcon" />
            </div>
          </div>
        </div>

        <div className="profileUpdateContentDesignContainer">
          <div className="laptopL:flex hidden justify-center items-center ">
            <Image
              alt="Update profile image"
              src="/assets/settingsIcon/profileUpdate.png"
              width={120}
              height={120}
              style={{
                objectFit: "contain",
                width: "auto",
                height: "auto"
              }}
            />
          </div>
          <div className="laptopL:hidden flex justify-center items-center">
            <Image
              priority
              alt="Update profile image"
              src="/assets/settingsIcon/profileUpdateL.png"
              width={200}
              height={200}
              style={{
                objectFit: "contain",
                width: "auto",
                height: "auto"
              }}
            />
          </div>
          <h1 className="textHeading2Responsive text-center">
            Update your info
          </h1>
        </div>
      </div>
    </>
  )
}

export default UserInfoCard