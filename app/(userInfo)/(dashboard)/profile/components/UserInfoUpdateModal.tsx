import React, { useEffect, useState } from 'react'
import { SaveIcon } from "@/components/utils/icons/UpdateBtns"
import { Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { creationDate } from "@/components/lib/createdDate"
import { EditIcon } from "@/components/utils/icons/UpdateBtns";
import Image from "next/image";


type Inputs = {
  username: string,
  email: string,
  password: string,
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

const UserInfoUpdateModal = (): React.JSX.Element | null => {
  const [ mounted, setMounted ] = useState<boolean>(false)
  const [ username, setUsername ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")
  const [ id, setId ] = useState<string>("")
  const [ createdOn, setCreatedOn ] = useState<string>("")
  const [ isSuccessUsername, setIsSuccessUsername ] = useState(false)
  const [ isSuccessEmail, setIsSuccessEmail ] = useState(false)
  const [ isSuccessPassword, setIsSuccessPassword ] = useState(false)

  console.log(isSuccessEmail)
  console.log(isSuccessPassword)
  console.log(isSuccessUsername)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    criteriaMode: "all",
    mode: "all"
  })


  useEffect(() => {
    setMounted(true)
  }, [
    setMounted
  ])
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

  // click the modal for show password and edit profile if the password is correct turn the state for modal to false and turn the state of the modal for edit password to true 

  // TODO: ASKED FOR THE USER PASSWORD BEFORE ENABLING THE EDIT PROFILE FORM


  // TODO: Need fixing. The feature below cause infinite loop due to multiple rerenders
  {/*
  const changedUsernameToSuccess = () => {
    const updateUsername = watch("username")
    const usernamePattern = /[\w!@#$%^&*()-+=<>?/\\,.;:'"[\]{}|]{3,}/gi
    const checkUsernamePattern = usernamePattern.test(updateUsername)
    console.log(checkUsernamePattern)
    if (checkUsernamePattern === true) {
      // setIsSuccessUsername(true)
    }
  }
  if (watch("username") !== "") {
    changedUsernameToSuccess()
  }

  const changedPasswordToSuccess = () => {
    const updateUsername = watch("username")
    const usernamePattern = /[\w!@#$%^&*()-+=<>?/\\,.;:'"[\]{}|]{3,}/gi
    const checkUsernamePattern = usernamePattern.test(updateUsername)
    console.log(checkUsernamePattern)
    if (checkUsernamePattern === true) {
      setIsSuccessUsername(true)
    }
  }

  const changeEmailToSuccess = () => {
    const updateEmail = watch("email")
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi
    const checkEmailPattern = emailPattern.test(updateEmail)
    console.log(checkEmailPattern)
    if (checkEmailPattern === true) {
      setIsSuccessEmail(true)
    }
  }

  const updatePassword = watch("password")
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/
  const checkPasswordPattern = passwordPattern.test(updatePassword)
  console.log(checkPasswordPattern)
  if (checkPasswordPattern === true) {
    // setIsSuccessPassword(true)
  }

   */}

  const OnSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  }

  return (
    <>
      <div className="absolute top-[15%] right-[50%] translate-x-[50%] border-2 border-default w-[80%] max-w-[700px] bg-default/90 md:p-10 sm:p-7 mobileL:p-5 p-3 rounded-2xl fadeIn">

        <div className="flex sm:flex-row flex-col w-full border-2 border-foreground/20 rounded-xl">
          <div className="sm:w-[30%] w-full flex justify-center items-center">
            <div className="sm:flex hidden border rounded-full shadow-xl ">
              <Image
                alt="Update profile image"
                src="/assets/settingsIcon/safetyGuideSmall.png"
                width={90}
                height={90}
                style={{
                  objectFit: "contain",
                  width: "auto",
                  height: "auto"
                }}
              />
            </div>

            <div className="sm:hidden flex py-5 ">
              <Image
                alt="Update profile image"
                src="/assets/settingsIcon/safetyGuide.png"
                width={90}
                height={90}
                style={{
                  objectFit: "contain",
                  width: "auto",
                  height: "auto"
                }}
                className="drop-shadow-xl"
              />
            </div>
          </div>
          <form
            onSubmit={handleSubmit(OnSubmit)}
            className='flex flex-col gap-4 sm:w-[70%] w-full px-2 py-3 mt-5 mx-auto'>
            <div className='flex flex-col'>
              <Input
                defaultValue={username}
                autoComplete="off"
                aria-autocomplete="none"
                aria-labelledby="username"
                id="username"
                isClearable
                type="text"
                variant="bordered"
                label="Username"
                className="w-full flex-1"
                classNames={{
                  inputWrapper: "formInputWrapper",
                  label: "formLabel",
                  input: "formInput"
                }}
                {...register("username", {
                  required: true,
                  pattern: /[\w!@#$%^&*()-+=<>?/\\,.;:'"[\]{}|]{3,}/gi
                })}
                name="username"
                startContent={
                  <EditIcon
                    className={`w-[20px] h-[20px] ${isSuccessUsername
                      ? "text-success-500"
                      : "text-foreground/70"}`}
                  />
                }
              />
              <p className="formErrorMessage">
                {errors.username?.types?.required && <span>Username is required</span>}
                {errors.username?.types?.pattern && <span>Space is not allowed and at least 3 characters</span>}
              </p>
            </div>

            <div className='flex flex-col'>
              <Input
                defaultValue={email}
                autoComplete="off"
                aria-autocomplete="none"
                aria-labelledby="email"
                id="email"
                isClearable
                type="email"
                variant="bordered"
                label="Email"
                className="w-full flex-1"
                classNames={{
                  inputWrapper: "formInputWrapper",
                  label: "formLabel",
                  input: "formInput"
                }}
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi
                })}
                name="email"
                startContent={
                  <EditIcon
                    className={`w-[20px] h-[20px] ${isSuccessEmail
                      ? "text-success-500"
                      : "text-foreground/70"}`}
                  />
                }
              />
              <p className="formErrorMessage">
                {errors.email?.types?.required && <span>A valid email is required</span>}
                {errors.email?.types?.pattern && <span>e.g. example@email.com</span>}
              </p>
            </div>

            <div className='flex flex-col'>
              <Input
                defaultValue={password}
                autoComplete="off"
                aria-autocomplete="none"
                isClearable
                aria-labelledby="password"
                id="password"
                variant="bordered"
                label="Password"
                classNames={{
                  inputWrapper: "formInputWrapper",
                  label: "formLabel",
                  input: "formInput"
                }}
                className="w-full flex-1"
                {...register("password", {
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  required: true
                })}
                name="password"
                startContent={
                  <EditIcon
                    className={`w-[20px] h-[20px] ${isSuccessPassword
                      ? "text-success-500"
                      : "text-foreground/70"}`}
                  />
                }
              />
              <p className="formErrorMessage">
                {errors.password?.types?.required && <span>Password is required</span>}
                {errors.password?.types?.pattern && <span className="max-w-[30em] flex flex-wrap flex-shrink">Minimum password of 8 and must have an uppercase, lowercase, number, and special character.</span>}
              </p>
            </div>

            <button
              type="submit"
              name="submit"
              className="border border-foreground/30 w-8 h-8 mx-auto flex justify-center items-center rounded-full shadow-xl"
            >
              <SaveIcon
                className="
                w-[32px] h-[32px] border-none rounded-full text-success-600 dark:text-success-300 dark:hover:text-success-400 hover:text-success-500 transform hover:scale-110 transition-all duration-300 mx-auto
              " />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UserInfoUpdateModal