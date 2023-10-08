"use client"
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, Input, Card } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { motion } from "framer-motion"
import PasswordReset from "@/components/(..)modals/PasswordReset";
import { useRouter } from 'next/navigation'
import SubmitSpinner from "@/components/lib/SubmitSpinner";
import NoAccount from "@/components/utils/warnings/alerts/NoAccount";
import WrongPassword from "@/components/utils/warnings/alerts/WrongPassword";
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import BrandLogoSignIn from '@/app/(root)/components/BrandLogoSignIn';
import IllustrationSignIn from '@/app/(root)/components/IllustrationSignIn';
import { usePathname } from 'next/navigation'
import SocialAuth from "@/components/SocialAuth";


interface Inputs {
  username: string;
  password: string;
}

const getData = async () => {
  const res = await fetch("api/users")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

//  main function here...
export default function SignIn() {
  const [ isVisible, setIsVisible ] = React.useState<boolean>(false);
  const [ clicked, setClicked ] = React.useState<boolean>(false)
  const [ noAccount, setNoAccount ] = React.useState<boolean>(false)
  const [ wrongPass, setWrongPass ] = React.useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/sign-in") {
      sessionStorage.clear();
    }
  }, [
    pathname
  ])

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: ""
    },
    criteriaMode: "all",
    mode: "all"
  });


  const OnSubmit: SubmitHandler<Inputs> = (data, e) => {
    const password = data.password
    const user_name = data.username
    e?.preventDefault()

    sessionStorage.setItem("username", user_name)

    const check_user_info = async () => {
      const data_from_DB = await getData()
      const passwordInput = password
      const usernameInput = user_name

      const userInfo_DB = data_from_DB.find((obj: { username: string; }) => obj.username === usernameInput)

      if (userInfo_DB === undefined) {
        // no existing account
        setClicked(!clicked)
        setTimeout(() => {
          setNoAccount(!noAccount)
        }, 3000);

      } else {
        // with an existing account
        const db_username = userInfo_DB.username
        const db_password = userInfo_DB.password

        if (usernameInput === db_username && passwordInput === db_password) {
          toast.success('Signed in successfully!', {
            className: "bg-[#47159d] text-white"
          })
          setClicked(!clicked)

          setTimeout(() => {
            router.push("/dashboard")
          }, 1000);
        } else {
          setWrongPass(!wrongPass)
        }
      }
    }

    if (pathname === '/sign-in') {
      check_user_info()
      if (!check_user_info) return null
    }

    return (
      <>
        {setClicked(!clicked)}
      </>
    )
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}>

        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
            }}
          />
        )}
      </Toaster>

      <div className={`fixed z-50 w-full h-[100%] backdrop-blur-lg top-0 ${noAccount
        ? "block"
        : "hidden"} 
        `}>
        <NoAccount />
      </div>

      <div className={`fixed z-50 w-full h-[100%] backdrop-blur-lg top-0 ${wrongPass
        ? "block"
        : "hidden"} 
        `}>
        <WrongPassword />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: .5 }}
        className="w-full min-h-screen flex flex-1 flex-col justify-center items-center lg:grid lg:grid-cols-2 gap-5 lg:p-32 md:p-20 sm:p-16 p-2"
      >
        <div className="p-7 flex lg:justify-center items-center md:p-12 sm:p-11">
          <Card
            className="flex flex-col flex-1 rounded-2xl p-5 gap-5 shadow-2xl shadow-violet-950 !max-w-[392px] !min-w-[259px] bg-background/30"
            id="signOptions">

            <BrandLogoSignIn />
            <SocialAuth />

            {/* form */}
            <form onSubmit={handleSubmit(OnSubmit)} className='flex flex-col gap-3'>
              <div className='flex flex-col'>
                <Input
                  autoComplete="off"
                  aria-autocomplete="none"
                  aria-labelledby="username"
                  id="username"
                  type="text"
                  isClearable
                  variant="bordered"
                  label="Username"
                  className="w-full flex-1 transition-all duration-300"
                  classNames={{
                    inputWrapper: [
                      "border-foreground/30 shadow-xl"
                    ],

                    label: "text-black/50 dark:text-white/90 sm:text-sm text-xs sm:font-normal font-small",
                    input: [
                      "sm:text-medium text-sm sm:font-normal font-normal",
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                  }}
                  {...register("username", {
                    required: true
                  })}
                />
                <p className="animate-pulse text-xs text-red-500 drop-shadow-xl">
                  {errors.username?.types?.required && <span>Username is required</span>}
                </p>
              </div>
              <div className='flex flex-col'>
                <div className="flex justify-end">
                  <PasswordReset />
                </div>
                <Input
                  autoComplete="off"
                  aria-autocomplete="none"
                  aria-labelledby="password"
                  id="password"
                  variant="bordered"
                  label="Password"
                  classNames={{
                    inputWrapper: [
                      "border-foreground/30 shadow-xl"
                    ],
                    label: "text-black/50 dark:text-white/90 sm:text-sm text-xs sm:font-normal font-small ",
                    input: [
                      "sm:text-medium text-sm sm:font-normal font-normal",
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                  }}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-foreground pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-foreground pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="w-full flex-1"
                  {...register("password", {
                    required: true
                  })}
                  name="password"
                />

                <p className="animate-pulse text-xs text-red-500 drop-shadow-xl">
                  {errors.password?.types?.required && <span>Password is required</span>}
                </p>
              </div>
              <div className='flex flex-col gap-1 my-3'>
                <Button
                  type="submit"
                  name="submit"
                  className="bg-green-800 hover:bg-green-900 drop-shadow-lg transition-all duration-300"
                >
                  <div className="text-slate-300 hover:text-white font-semibold flex-1 flex justify-center items-center">
                    {clicked
                      ? <SubmitSpinner />
                      : <p className="text-white">Continue</p>
                    }</div>
                </Button>
              </div>
            </form>
          </Card>
        </div>
        <IllustrationSignIn />
      </motion.div>
    </>
  )
}
