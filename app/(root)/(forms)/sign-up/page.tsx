"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import Image from 'next/image';
import { Input, Card } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { MyButton } from "@/components/utils/tailwindvariants/tv";
import { bgIllustration } from "@/components/constants";
import { Company } from "@/components/constants";
import IconChanger from "@/components/lib/IconChanger";
import { iconsSrc } from "@/components/constants";
import SuccessButton from "@/components/lib/buttonOptions/successButton";
import DefaultButton from "@/components/lib/buttonOptions/defaultButton";
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { creationDate } from "@/components/lib/createdDate"
import Value_from_form from "@/app/api/lib/users/Value_from_form";

// this object is for type declaration of useForm() function specifically for register method.
interface Inputs {
    username: string;
    password: string;
    email: string;
    confirmPw: string;
}

// DATA FROM THE SERVER
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
    const [isVisible, setIsVisible] = React.useState(false);
    const [isConfirmed, setIsConfirmed] = React.useState(false);
    const router = useRouter()

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleIsConfirmed = () => setIsConfirmed(!isConfirmed)


    // console.log(userDetailsDB.username)

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



    const validatePassword = (): React.ReactNode => {
        const password = watch("password")
        const confirmed = watch("confirmPw")

        const determineMatched = (): any => {
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
                        <p className="animate-pulse text-xs text-green-400 hidden">Matched!</p>
                    </>
                )
            } else {
                return (
                    <>
                        <p className="animate-pulse text-xs text-red-400">Password does not matched!</p>
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

    const ButtonChanger = (): React.ReactNode => {
        const password = watch("password")
        const confirmed = watch("confirmPw")

        const checkMatchedPw = (): any => {
            if (password === "" && confirmed === "") {
                return (

                    <DefaultButton />
                )
            } else if (password === undefined && confirmed === undefined) {
                return (
                    <DefaultButton />
                )
            } else if (password === confirmed) {
                return (
                    <SuccessButton />
                )
            } else {
                return (
                    <DefaultButton />
                )
            }
        }

        return (
            <>
                {checkMatchedPw()}
            </>
        )
    }


    const OnSubmit: SubmitHandler<Inputs> = async (data: any, e) => {
        e?.preventDefault()
        const password = data.password
        const confirmed = data.confirmPw
        const user_name = data.username
        const email_acc = data.email
        const created_on = `${creationDate}`

        const check_existing_acc = async () => {
            const data_from_DB = await getData()
            console.log(data_from_DB.length)

            if (data_from_DB.length === 0) {
                setTimeout(async () => {
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
                }, 1000);
                console.log("Successfully created a new account.")
            } else if (data_from_DB.length === 1) {
                const username_DB = data_from_DB[0].username
                const email_DB = data_from_DB[0].email

                // value form the database
                console.log(username_DB)
                console.log(email_DB)

                // value from the form
                console.log(user_name)
                console.log(email_acc)

                if (user_name === username_DB || email_acc === email_DB) {
                    alert("You already have an account. Try signing in.")
                    router.push('/sign-in', { scroll: false })
                }
            } else {
                alert("Please create a new account")
            }
        }

        const beforeSubmit = () => {
            if (password !== confirmed) {
                alert("Please check your password!")
            } else {
                console.log("Password matched!")
            }
        }

        return (
            <>
                {beforeSubmit()}
                {check_existing_acc()}
                {Value_from_form(user_name)}
            </>
        )
    }


    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "backIn", duration: 0.25 }}
            >
                <div className=" w-full min-h-screen flex flex-1 flex-col justify-center items-center mt-10 ">
                    <div className="sm:p-5 p-3">
                        <Card className="flex flex-col flex-1 rounded-2xl p-5 gap-5 mb-24 shadow-2xl max-w-[640px] bg-background/60 dark:bg-default-100/50" id="signOptions">
                            <div className='w-full flex justify-start mt-2'>
                                <Image
                                    src={Company.imgSrc}
                                    alt={Company.name}
                                    width={100}
                                    height={100}
                                    style={{
                                        objectFit: "cover",
                                        width: "30%",
                                        height: "30%"
                                    }}
                                    className="drop-shadow-md"
                                />
                            </div>
                            <div className='p-3'>
                                <h1 className="sm:text-4xl text-xl sm:font-medium font-normal mb-1 drop-shadow-xl">Create your account</h1>
                                <p className="sm:text-medium text-xs sm:font-normal font-small drop-shadow-md">to access {Company.name} </p>
                            </div>

                            {/* 
                            // Todo: generate a function that will allow the sign in options facebook, google, and github
                        */}
                            <div className="flex items-center justify-evenly loginButtons">
                                <div>
                                    <MyButton
                                        variant="flat"
                                        size="md"
                                        className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300 flex-1 shadow-xl">
                                        <Image
                                            priority
                                            src={iconsSrc.facebook}
                                            alt={iconsSrc.nameFb}
                                            width={24}
                                            height={24}
                                            style={{
                                                objectFit: "cover"

                                            }}
                                            className="drop-shadow-lg"
                                        />
                                    </MyButton>
                                </div>

                                <div>
                                    <MyButton
                                        variant="flat"
                                        size="md"
                                        className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300 shadow-xl flex-1"
                                    >
                                        <IconChanger />
                                    </MyButton>
                                </div>

                                <div>
                                    <MyButton
                                        variant="flat"
                                        size="md"
                                        className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300  shadow-xl flex-1">
                                        <Image
                                            priority
                                            src={iconsSrc.google}
                                            alt={iconsSrc.nameG}
                                            width={24}
                                            height={24}
                                            style={{
                                                objectFit: "cover"
                                            }}
                                            className="drop-shadow-lg "
                                        />
                                    </MyButton>
                                </div>
                            </div>

                            <div className="flex flex-1 justify-center items-center">
                                <hr className='w-full'></hr>
                                <p className="sm:px-3 p-1 sm:text-medium text-xs sm:font-normal font-small">or</p>
                                <hr className='w-full'></hr>
                            </div>

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
                                            pattern: /(?=\w{5,18})(?=\D*\d)/,
                                            required: true
                                        })}
                                        name="password"
                                    />
                                    <p className="animate-pulse text-xs text-red-400">
                                        {errors.password?.types?.required && <span>Password is required</span>}
                                        {errors.password?.types?.pattern && <span>Password must be at least 5 characters and one number</span>}
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
                                            pattern: /(?=\w{5,18})(?=\D*\d)/,
                                            required: true
                                        })}
                                        name="confirmPw"
                                    />
                                    {validatePassword()}
                                </div>
                                <div className='flex flex-col gap-1 my-3'>
                                    <ButtonChanger />
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col justify-center items-center p-10 z-0 mb-10 md:gap-11 gap-5">
                    <h1 className="sm:text-2xl text-medium font-bold text-[#FB542B] drop-shadow-xl">Create connection</h1>
                    <Image
                        priority
                        src={bgIllustration.connect.src}
                        alt={bgIllustration.connect.name}
                        width={400}
                        height={400}
                    />
                </div>
            </motion.div>
        </>
    )
}

