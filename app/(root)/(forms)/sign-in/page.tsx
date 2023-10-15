"use client"
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, Input, Card } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import SubmitSpinner from "@/components/lib/SubmitSpinner";
import NoAccount from "@/components/utils/warnings/alerts/NoAccount";
import WrongPassword from "@/components/utils/warnings/alerts/WrongPassword";
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import BrandLogoSignIn from '@/app/(root)/components/BrandLogoSignIn';
import IllustrationSignIn from '@/app/(root)/components/IllustrationSignIn';
import { usePathname } from 'next/navigation'
import SocialAuth from "@/components/SocialAuth";
import PasswordReset from "@/components/utils/warnings/alerts/PasswordReset";
import PasswordResetModal from "@/components/PasswordResetModal";
import { useModalContext } from "@/app/context/ModalContext";


interface Inputs {
  username: string;
  password: string;
}

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "force-cache"
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

//  main function here...
export default function SignIn(): React.JSX.Element | null {
  const [ isVisible, setIsVisible ] = React.useState<boolean>(false);
  const [ clicked, setClicked ] = React.useState<boolean>(false)
  const [ noAccount, setNoAccount ] = React.useState<boolean>(false)
  const [ wrongPass, setWrongPass ] = React.useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()
  const { resetReq } = useModalContext()
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


  useEffect(() => {
    if (pathname === "/sign-in") {
      sessionStorage.clear();
    }
  }, [
    pathname
  ])

  const toggleVisibility = () => setIsVisible(!isVisible);



  const OnSubmit: SubmitHandler<Inputs> = (data, e) => {
    const password = data.password
    const user_name = data.username
    e?.preventDefault()

    const usernameLower = user_name.toLowerCase()

    sessionStorage.setItem("username", usernameLower)

    const check_user_info = async () => {
      const data_from_DB = await getData()
      const passwordInput = password
      const usernameInput = usernameLower

      const userInfo_DB = data_from_DB.find(({ username }: { username: string; }) => username === usernameInput)

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

      <div className={`warningMessage ${noAccount
        ? "block"
        : "hidden"} 
        `}>
        <NoAccount />
      </div>

      <div className={`warningMessage ${wrongPass
        ? "block"
        : "hidden"} 
        `}>
        <WrongPassword />
      </div>

      <div className={`warningMessage ${resetReq
        ? "block"
        : "hidden"} 
        `}>
        <PasswordResetModal />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: .5 }}
        className="formContainer"
      >
        <div className="formWrapper">
          <Card
            className="formContent">

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
                  classNames={{
                    inputWrapper: "formInputWrapper",
                    label: "formLabel",
                    input: "formInput",
                  }}
                  {...register("username", {
                    required: true
                  })}
                />
                <p className="formErrorMessage">
                  {errors.username?.types?.required && <span>Username is required</span>}
                </p>
              </div>
              <div className='flex flex-col'>
                <div
                  className="flex justify-end">
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
                    inputWrapper: "formInputWrapper",
                    label: "formLabel",
                    input: "formInput"
                  }}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className="contentIcon" />
                      ) : (
                        <EyeFilledIcon className="contentIcon" />
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

                <p className="formErrorMessage">
                  {errors.password?.types?.required && <span>Password is required</span>}
                </p>
              </div>
              <div className='flex flex-col gap-1 my-3'>
                <Button
                  type="submit"
                  name="submit"
                  className="submitBtn"
                >
                  <div className="submitBtnContent">
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
