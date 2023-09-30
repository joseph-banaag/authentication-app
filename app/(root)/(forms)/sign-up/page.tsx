"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Input, Card, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { creationDate } from "@/components/lib/createdDate"
import SocialAuth from "@/components/utils/SocialAuth";
import SubmitSpinner from "@/components/lib/SubmitSpinner";
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import AccountExist from "@/components/utils/warnings/alerts/AccountExist";
import IllustrationSigUp from '@/app/(root)/components/IllustrationSigUp';
import BrandLogoSignUp from '@/app/(root)/components/BrandLogoSignUp';


const storedDataSU = {
  data: typeof window !== "undefined" ? sessionStorage.getItem("usernameSignUp") : ""
}
const usernameSignupValue = `${storedDataSU.data}`

console.log(usernameSignupValue)


// this object is for type declaration of useForm() function specifically for register method.
interface Inputs {
  username: string;
  password: string;
  email: string;
  confirmPw: string;
}

// DATA FROM THE DATABASE
async function getData() {
  const res = await fetch("api/users", {
    method: "GET"
  })
  if (!res.ok) {
    throw new Error("There was a problem getting information form the API")
  }
  return res.json()
}

// * main function here...
export default function SignUp() {
  const [ isVisible, setIsVisible ] = React.useState(false);
  const [ isConfirmed, setIsConfirmed ] = React.useState(false);
  const [ clicked, setClicked ] = React.useState(false)
  const [ exist, setExist ] = React.useState(false)


  const router = useRouter()

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleIsConfirmed = () => setIsConfirmed(!isConfirmed)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPw: ""
    },
    criteriaMode: "all",
    mode: "all"
  })


  // this function is for the error message regarding password
  const validatePassword = (): React.ReactNode => {
    const password = watch("password")
    const confirmed = watch("confirmPw")

    const determineMatched = () => {
      if (password === "" && confirmed === "") {
        return (
          <>
            <p className="animate-pulse text-xs text-red-400">Password is required!</p>
          </>
        )
      } else if (password === undefined && confirmed === undefined) {
        return (
          <>
            <p className="animate-pulse text-xs text-red-400">Password is required!</p>
          </>
        )
      } else if (password === confirmed) {
        return (
          <>
            <p className="hidden">Password matched!</p>
          </>
        )
      } else {
        return (
          <>
            <p className="animate-pulse text-xs text-red-400">Passwords do not matched!</p>
          </>
        )
      }
    }
    return (
      <>
        {determineMatched()}
      </>
    )
  }

  // this is for the form submission 
  const OnSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault()
    const password = data.password
    const confirmed = data.confirmPw
    const user_name = data.username
    const email_acc = data.email
    const created_on = `${creationDate}`

    if (typeof window !== "undefined") {
      sessionStorage.setItem("usernameSignUp", user_name)
    }


    const check_existing_acc = async () => {
      const data_from_DB = await getData()

      console.log(data_from_DB)

      if (data_from_DB.length === 0) {
        // this will handle a fresh new data with zero document

        const res = await fetch("api/users", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            password,
            confirmed,
            user_name,
            email_acc,
            created_on
          })
        })

        toast.success('Successfully created a new account!')

        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)

      } else if (data_from_DB.length > 0) {
        // this will handle a database that has existing documents and create a new account
        const user_input = `${user_name}`;

        const userInfo_Document = data_from_DB.find((obj: { username: string; }) => obj.username === user_input)


        if (userInfo_Document === undefined) {

          const res = await fetch("api/users", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              password,
              confirmed,
              user_name,
              email_acc,
              created_on
            })
          })
          toast.success('Successfully created a new account!')


          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        }
      }
    }

    return (
      <>

        {setClicked(!clicked)}
        {check_existing_acc()}
      </>
    )
  }

  // this has logic to route the user to sign in if the given account is existing in the database
  const handleButtonClick = async () => {
    const usernameInput = watch("username")
    const emailInput = watch("email")

    const data_from_DB = await getData()

    const DB_docs = data_from_DB.find((obj: { username: string; }) => obj.username === usernameInput)

    if (DB_docs === undefined) {
      setClicked(!clicked)
    } else {
      const db_username = DB_docs.username
      const db_email = DB_docs.email

      if (usernameInput === db_username || emailInput === db_email) {
        // alert for an existing account
        setExist(!exist)

      }
    }
  }

  // this function will handed disabling submit button 
  const enableSubmitButton = (): React.ReactNode => {
    const password = watch("password")
    const confirmed = watch("confirmPw")

    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;


    const changeSubmitButton = () => {
      if (password === "" || confirmed === "") {
        return (
          <>
            <Button
              type="submit"
              onClick={handleButtonClick}
              isDisabled
              name="submit"
              className="bg-green-800 hover:bg-green-900 drop-shadow-lg transition-all duration-300"
            >
              <p className="text-slate-300 hover:text-white font-semibold flex-1">Continue</p>
            </Button >
          </>
        )
      } else if (password === confirmed) {

        const checkPattern = pattern.test(password)

        const checkPassReq = () => {
          if (checkPattern === true) {
            return (
              <>
                <Button
                  type="submit"
                  onClick={handleButtonClick}
                  name="submit"
                  className="bg-green-800 hover:bg-green-900 drop-shadow-lg transition-all duration-300"
                >
                  <p className="text-slate-300 hover:text-white font-semibold flex-1 flex justify-center items-center">{clicked
                    ? <SubmitSpinner />
                    : "Continue"}</p>
                </Button >
              </>
            )
          } else {
            toast.error("Passwords does not meet the requirements. Check for errors.")
            return (
              <>
                <Button
                  type="submit"
                  onClick={handleButtonClick}
                  isDisabled
                  name="submit"
                  className="bg-green-800 hover:bg-green-900 drop-shadow-lg transition-all duration-300"
                >
                  <p className="text-slate-300 hover:text-white font-semibold flex-1">Continue</p>
                </Button >
              </>
            )
          }
        }
        return (
          <>
            {checkPassReq()}
          </>
        )
      } else {
        return (
          <>
            <Button
              type="submit"
              onClick={handleButtonClick}
              isDisabled
              name="submit"
              className="bg-green-800 hover:bg-green-900 drop-shadow-lg transition-all duration-300"
            >
              <p className="text-slate-300 hover:text-white font-semibold flex-1">Continue</p>
            </Button >
          </>
        )
      }
    }
    return (
      <>
        {changeSubmitButton()}
      </>
    )
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: 'bg-[#47159d] p-5 border-1 text-white rounded-2xl',
        }}>
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

      <div className={`${exist ? "block" : "hidden"} fixed z-50 w-full h-[100%] backdrop-blur-md`}>
        <AccountExist />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 0.25 }}
      >
        <div className=" w-full min-h-screen flex flex-1 flex-col justify-center items-center mt-10 ">
          <div className="sm:p-5 p-3">
            <Card className="flex flex-col flex-1 rounded-2xl p-5 gap-5 mb-24 shadow-2xl max-w-[640px] bg-background/60 dark:bg-default-100/50" id="signOptions">

              <BrandLogoSignUp />
              <SocialAuth />

              {/* form */}
              <form onSubmit={handleSubmit(OnSubmit)} className='flex flex-col gap-7'>
                <div className='flex flex-col'>
                  <Input
                    autoComplete="off"
                    aria-autocomplete="none"
                    id="username"
                    isClearable
                    type="text"
                    variant="bordered"
                    label="Username"
                    className="w-full flex-1"
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
                      required: true,
                      pattern: /[\w!@#$%^&*()-+=<>?/\\,.;:'"[\]{}|]{3,}/gi
                    })}
                    name="username"
                  />
                  <p className="animate-pulse text-xs text-red-400">
                    {errors.username?.types?.required && <span>Username is required</span>}
                    {errors.username?.types?.pattern && <span>Space is not allowed and at least 3 characters</span>}
                  </p>
                </div>
                <div className='flex flex-col'>
                  <Input
                    autoComplete="off"
                    aria-autocomplete="none"
                    id="email"
                    isClearable
                    type="email"
                    variant="bordered"
                    label="Email"
                    className="w-full flex-1"
                    classNames={{
                      label: "text-black/50 dark:text-white/90 sm:text-sm text-xs sm:font-normal font-small ",
                      input: [
                        "sm:text-medium text-sm sm:font-normal font-normal",
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                      ],
                    }}
                    {...register("email", {
                      required: true,
                      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi
                    })}
                    name="email"
                  />
                  <p className="animate-pulse text-xs text-red-400">
                    {errors.email?.types?.required && <span>A valid email is required</span>}
                    {errors.email?.types?.pattern && <span>e.g. example@email.com</span>}

                  </p>
                </div>

                <div className='flex flex-col'>
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
                      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                      required: true
                    })}
                    name="password"
                  />
                  <p className="animate-pulse text-xs text-red-400">
                    {errors.password?.types?.required && <span>Password is required</span>}
                    {errors.password?.types?.pattern && <span className="max-w-[30em] flex flex-wrap flex-shrink">Minimum password of 8 and must have an uppercase, lowercase, number, and special character.</span>}
                  </p>
                </div>

                <div className='flex flex-col'>
                  <Input
                    autoComplete="off"
                    aria-autocomplete="none"
                    id="confirmPw"
                    variant="bordered"
                    label="Confirm Password"
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
                      <button className="focus:outline-none" type="button" onClick={toggleIsConfirmed}>
                        {isConfirmed ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isConfirmed ? "text" : "password"}
                    className="w-full flex-1"
                    {...register("confirmPw", {
                      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                      required: true
                    })}
                    name="confirmPw"
                  />
                  {validatePassword()}
                </div>
                <div className='flex flex-col gap-1 my-2'>
                  {enableSubmitButton()}
                </div>
              </form>
            </Card>
          </div>
        </div>

        <IllustrationSigUp />
      </motion.div>
    </>
  )
}

