"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, Input, Card } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { motion } from "framer-motion"
import PasswordReset from "@/components/(..)modals/PasswordReset";
import { useRouter } from 'next/navigation'
import SocialAuth from "@/components/utils/SocialAuth";
import SubmitSpinner from "@/components/lib/SubmitSpinner";
import NoAccount from "@/components/utils/warnings/alerts/NoAccount";
import WrongPassword from "@/components/utils/warnings/alerts/WrongPassword";
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import { hookstate, useHookstate, State } from '@hookstate/core';
import BrandLogoSignIn from '@/app/(root)/components/BrandLogoSignIn';
import IllustrationSignIn from '@/app/(root)/components/IllustrationSignIn';


const storedDataSI = {
  data: typeof window !== "undefined" ? sessionStorage.getItem("usernameSignIn") : ""
}
const usernameSignInValue = `${storedDataSI.data}`

console.log(usernameSignInValue)


// this will set the username from sign in entry point as global value
const globalState = hookstate<string | null>("");
const wrapState = (s: State<string | null>) => ({
  get: () => s.value,
  display: () => s.set(usernameSignInValue)
})
export const accessGlobalState = () => wrapState(globalState)
export const useGlobalState = () => wrapState(useHookstate(globalState))

setInterval(() => accessGlobalState().display(), 100)

interface Inputs {
  username: string;
  password: string;
}

// DATA FROM THE DATABASE
async function getData() {
  const res = await fetch("api/users")
  if (!res.ok) {
    throw new Error("There was a problem getting information form the API")
  }
  return res.json()
}

// * main function here...
export default function SignIn() {
  const [ isVisible, setIsVisible ] = React.useState<boolean>(false);
  const [ clicked, setClicked ] = React.useState<boolean>(false)
  const [ noAccount, setNoAccount ] = React.useState<boolean>(false)
  const [ wrongPass, setWrongPass ] = React.useState<boolean>(false)
  const router = useRouter()
  const state = useGlobalState();

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

    if (typeof window !== "undefined") {
      sessionStorage.setItem("usernameSignIn", user_name)
    }

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
            className: "bg-[#47159d], text-white"
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

    return (

      <>
        {setClicked(!clicked)}
        {check_user_info()}
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

      <div className={`${noAccount
        ? "block"
        : "hidden"} 
                fixed z-50 w-full h-[100%] backdrop-blur-md`}>
        <NoAccount />
      </div>

      <div className={`${wrongPass
        ? "block"
        : "hidden"} 
                fixed z-50 w-full h-[100%] backdrop-blur-md`}>
        <WrongPassword />
      </div>



      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 0.25 }}
      >
        <div className=" w-full min-h-screen flex flex-1 flex-col justify-center items-center">
          <div className="sm:p-5 p-3">
            <Card className="flex flex-col flex-1 rounded-2xl p-5 gap-5 mb-24 shadow-2xl max-w-[640px] bg-background/60 dark:bg-default-100/50" id="signOptions">

              <BrandLogoSignIn />
              <SocialAuth />

              {/* form */}
              <form onSubmit={handleSubmit(OnSubmit)} className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                  <Input
                    autoComplete="off"
                    aria-autocomplete="none"
                    id="username"
                    type="text"
                    isClearable
                    variant="bordered"
                    label="Username"
                    className="w-full flex-1 transition-all duration-300"
                    classNames={{
                      label: "text-black/50 dark:text-white/90 sm:text-sm text-xs sm:font-normal font-small ",
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

                  <p className="animate-pulse text-xs text-red-400">
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
                    id="password"
                    variant="bordered"
                    label="Password"
                    classNames={{
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
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
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

                  <p className="animate-pulse text-xs text-red-400">
                    {errors.password?.types?.required && <span>Password is required</span>}
                  </p>
                </div>
                <div className='flex flex-col gap-1 my-3'>
                  <Button
                    type="submit"
                    name="submit"
                    onClick={() => state.display()}
                    className="bg-green-800 hover:bg-green-900 drop-shadow-lg transition-all duration-300">
                    <p className="text-slate-300 hover:text-white font-semibold flex-1 flex justify-center items-center">
                      {clicked
                        ? <SubmitSpinner />
                        : "Continue"
                      }</p>
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>

        <IllustrationSignIn />
      </motion.div>
    </>
  )
}
