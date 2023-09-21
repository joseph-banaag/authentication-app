"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import Image from 'next/image';
import { Input, Card, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { bgIllustration } from "@/components/constants";
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { creationDate } from "@/components/lib/createdDate"
import SocialAuth from "@/components/utils/SocialAuth";
import { Db_userInformation_from_SU } from "@/app/(user)/dashboard/userDB_info/UserInfo_DB";
import SubmitSpinner from "@/components/lib/SubmitSpinner";

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
    const [clicked, setClicked] = React.useState(false)


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
                        <p className="hidden">Password matched!</p>
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

    // this is for the form submission 
    const OnSubmit: SubmitHandler<Inputs> = async (data: any, e) => {
        e?.preventDefault()
        const password = data.password
        const confirmed = data.confirmPw
        const user_name = data.username
        const email_acc = data.email
        const created_on = `${creationDate}`

        const check_existing_acc = async () => {
            const data_from_DB = await getData()

            // console.log(data_from_DB.length)

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
                console.log("Successfully added a new user")

                setTimeout(() => {
                    router.push('/dashboard')
                }, 2000)

            } else if (data_from_DB.length > 0) {
                // this will handle a database that has existing documents and create a new account
                const user_input = `${user_name}`;

                const userInfo_Document = data_from_DB.find((obj: { username: any; }) => obj.username === user_input)

                // console.log(userInfo_Document)

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
                    console.log("Successfully added a new user")

                    setTimeout(() => {
                        router.push('/dashboard')
                    }, 2000)
                } 
            }
        }

        return (
            <>
                {check_existing_acc()}
                {Db_userInformation_from_SU()}
            </>
        )
    }
    

    // this has logic to route the user to sign in if the given account is existing in the database
    const handleButtonClick = async () => {
        const usernameInput = watch("username")
        const emailInput = watch("email")

        const data_from_DB = await getData()
        // console.log(data_from_DB)

        const DB_docs = data_from_DB.find((obj: { username: any; }) => obj.username === usernameInput)

        // console.log(DB_docs)

        if (DB_docs === undefined) {
            console.log("Creating new account...")
            // if undefined a new account will be created. See handleSubmit.
            const newClick = !clicked
            setClicked(newClick)

        } else {
            const db_username = DB_docs.username
            const db_email = DB_docs.email

            if (usernameInput === db_username || emailInput === db_email) {
                alert("You already have an account. Please sign in")
                // TODO: create a modal for this message and then add the router to the close button of the modal
                router.push('/sign-in', { scroll: false })
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
                            className="bg-green-800 hover:bg-green-950 drop-shadow-lg transition-all duration-300"
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
                                    className="bg-green-800 hover:bg-green-950 drop-shadow-lg transition-all duration-300"
                                >
                                    <p className="text-slate-300 hover:text-white font-semibold flex-1">{clicked ? <SubmitSpinner /> : "Continue"}</p>
                                </Button >
                            </>
                        )
                    } else {
                        alert("Password does not meet the requirements!")
                        // TODO: create a modal for this message and then add location.reload to refresh the page.
                        return (
                            <>
                                <Button
                                    type="submit"
                                    onClick={handleButtonClick}
                                    isDisabled
                                    name="submit"
                                    className="bg-green-800 hover:bg-green-950 drop-shadow-lg transition-all duration-300"
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
                            className="bg-green-800 hover:bg-green-950 drop-shadow-lg transition-all duration-300"
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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "backIn", duration: 0.25 }}
            >
                <div className=" w-full min-h-screen flex flex-1 flex-col justify-center items-center mt-10 ">
                    <div className="sm:p-5 p-3">
                        <Card className="flex flex-col flex-1 rounded-2xl p-5 gap-5 mb-24 shadow-2xl max-w-[640px] bg-background/60 dark:bg-default-100/50" id="signOptions">

                            <SocialAuth />

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

