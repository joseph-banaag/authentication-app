import React, { useEffect, useState } from 'react'
import { SaveIcon } from "@/components/utils/icons/UpdateBtns"
import { Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  username: string;
  password: string;
  email: string;
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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      email: `${email}`,
      username: `${username}`,
      password: `${password}`,
    },
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

  const OnSubmit: SubmitHandler<Inputs> = async (data, e) => {
    e?.preventDefault
    console.log(data.username)
  }

  // TODO: FORM IS NOT WORKING. data is not getting the value from the form

  return (
    <>
      <div className="absolute top-[15%] right-[50%] translate-x-[50%] border-2 border-default w-[80%] max-w-[700px] bg-default/90 md:p-10 sm:p-7 mobileL:p-5 p-3 rounded-2xl fadeIn">
        <div className="flex flex-col justify-center items-center gap-3">
          <form onSubmit={handleSubmit(OnSubmit)} className='flex flex-col gap-7'>
            <small className="text-warning animate animate-pulse">Form is not yet working</small>
            <ul className="w-full border-2 border-collapse border-foreground/30 rounded-lg px-2 py-3 ">
              {/*** USERNAME ***/}
              <li className="profileUpdateInfoItems">
                <div className="text-xs font-medium tracking-wide textColor flex justify-start items-center">
                  Username:
                </div>
                <div className="flex flex-col">
                  <Input
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
                  />
                  <p className="formErrorMessage">
                    {errors.username?.types?.required && <span>Username is required</span>}
                    {errors.username?.types?.pattern && <span>Space is not allowed and at least 3 characters</span>}
                  </p>
                </div>
              </li>
              <div className="w-full flex justify-end">
                <hr className="w-[95%] border-foreground/30" />
              </div>

              {/*** EMAIL ***/}
              <li className="profileUpdateInfoItems">
                <div className="text-xs font-medium tracking-wide textColor flex justify-start items-center">
                  Email:
                </div>
                <div className="flex flex-col">
                  <Input
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
                  />
                  <p className="formErrorMessage">
                    {errors.email?.types?.required && <span>A valid email is required</span>}
                    {errors.email?.types?.pattern && <span>e.g. example@email.com</span>}
                  </p>
                </div>
              </li>
              <div className="w-full flex justify-end">
                <hr className="w-[95%] border-foreground/30" />
              </div>

              {/*** PASSWORD ***/}
              <li className="profileUpdateInfoItems">
                <div className="text-xs font-medium tracking-wide textColor flex justify-start items-center">
                  Password:
                </div>
                <div className="flex flex-col">
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

                    type="text"
                    className="w-full flex-1"
                    {...register("password", {
                      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                      required: true
                    })}
                    name="password"
                  />
                  <p className="formErrorMessage">
                    {errors.password?.types?.required && <span>Password is required</span>}
                    {errors.password?.types?.pattern && <span className="max-w-[30em] flex flex-wrap flex-shrink">Minimum password of 8 and must have an uppercase, lowercase, number, and special character.</span>}
                  </p>
                </div>
              </li>
              <div className="w-full flex justify-end">
                <hr className="w-[95%] border-foreground/30" />
              </div>

              <li className="profileUpdateInfoItems">
                <div className="text-xs font-medium tracking-wide textColor flex justify-start items-center">
                  Created on:
                </div>
                <div className="text-sm text-foreground/90 min-w-[100px] ">
                  {createdOn}
                </div>
              </li>
            </ul>
          </form>
          <SaveIcon
            onClick={OnSubmit}
            className="w-10 h-10 text-success-700 hover:text-success-600  dark:text-success-300 dark:hover:text-success-400 transform hover:scale-105 transition-all duration-300" />
        </div>
      </div>
    </>
  )
}

export default UserInfoUpdateModal