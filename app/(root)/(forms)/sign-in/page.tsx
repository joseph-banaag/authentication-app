"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import Image from 'next/image';
import { Button, Input, Card } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { bgIllustration } from "@/components/constants";
import { motion } from "framer-motion"
import PasswordReset from "@/components/(..)modals/PasswordReset";
import { useRouter } from 'next/navigation'
import SocialAuth from "@/components/utils/SocialAuth";
// import { client } from "app/mongodb/index"

// this object is for type declaration of useForm() function specifically for register method.
interface Inputs {
    username: string;
    password: string;
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
export default function SignIn() {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isDark, setIsDark] = React.useState(true);
    const [isMatched, setIsMatched] = React.useState(false)
    const router = useRouter()


    // todo: this will change the button bg to green if the password is matched form the db
    const MatchedPw = () => {
        return (
            setIsMatched(!isMatched)
        )
    }

    const changeIcon = () => {
        return (
            setIsDark(!isDark)
        )
    }
    const toggleVisibility = () => setIsVisible(!isVisible);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        getValues
    } = useForm<Inputs>({
        defaultValues: {
            username: "",
            password: ""
        },
        criteriaMode: "all",
        mode: "all"
    });

    const OnSubmit: SubmitHandler<Inputs> = (data: any, e) => {
        const password = data.password
        const user_name = data.username
        e?.preventDefault()


        // * given password and username will be removed from the if-statement once data from db is existing.
        const check_user_info = async () => {
            const data_from_DB = await getData()
            const passwordInput = password
            const usernameInput = user_name

            console.log(data_from_DB.length)

            const userInfo_DB = data_from_DB.find((obj: { username: any; }) => obj.username === usernameInput)

            console.log(userInfo_DB)

            if (userInfo_DB === undefined) {
                alert("Please sign up to create an account")
                setTimeout(() => {
                    router.push("/sign_up")
                }, 1000);
            }

            const db_username = userInfo_DB.username
            const db_password = userInfo_DB.password
            // this is from the database
            console.log(db_password)
            console.log(db_username)


            // this is from the form
            console.log(passwordInput)
            console.log(usernameInput)

            if (usernameInput === db_username && passwordInput === db_password) {
                console.log("Account exist")
                setTimeout(() => {
                    router.push("/dashboard")
                }, 1000);
            }
        }

        return (
            <>
                {check_user_info()}
            </>
        )
    }

    return (
        <> <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "backIn", duration: 0.25 }}
        >
            <div className=" w-full min-h-screen flex flex-1 flex-col justify-center items-center">
                <div className="sm:p-5 p-3">
                    <Card className="flex flex-col flex-1 rounded-2xl p-5 gap-5 mb-24 shadow-2xl max-w-[640px] bg-background/60 dark:bg-default-100/50" id="signOptions">

                        <SocialAuth />

                        <div className="flex flex-1 justify-center items-center">
                            <hr className='w-full'></hr>
                            <p className="sm:px-3 p-1 sm:text-medium text-xs sm:font-normal font-small">or</p>
                            <hr className='w-full'></hr>
                        </div>

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
                                {/* 
                                    //todo: generate a function that will check if the user username input is matched with the user information from db
                                */}
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
                                {/* 
                                    //todo: generate a function that will check if the user password input is matched with the user information from db
                                */}
                                <p className="animate-pulse text-xs text-red-400">
                                    {errors.password?.types?.required && <span>Password is required</span>}
                                </p>
                            </div>
                            <div className='flex flex-col gap-1 my-3'>
                                {/* 
                                    // Todo: create a matching function that will change the button to green if the password from the user is matched with the user information form db
                                    // todo: if the sign in is successful the page will redirect the user to a different layout specifically for logged in users where navbar is also different
                                    
                                */}
                                {isMatched
                                    ? <Button type="submit" name="submit" className="bg-green-800 hover:bg-green-600 drop-shadow-lg transition-all duration-300">
                                        <p className="text-slate-300 hover:text-white font-semibold flex-1">Continue</p>
                                    </Button>
                                    : <Button type="submit" name="submit" className="bg-violet-800 hover:bg-violet-950 drop-shadow-lg transition-all duration-300">
                                        <p className="text-slate-300 hover:text-white font-semibold flex-1">Continue</p>
                                    </Button>}

                            </div>
                        </form>
                    </Card>
                </div>
            </div>

            <div className="flex md:flex-row flex-col justify-center items-center p-10 z-0 mb-10 md:gap-11 gap-5">
                <h1 className="sm:text-2xl text-medium font-bold text-[#FB542B] drop-shadow-xl">Connect with the community</h1>
                <Image
                    src={bgIllustration.group.src}
                    alt={bgIllustration.group.name}
                    width={400}
                    height={400}
                />
            </div>
        </motion.div>
        </>
    )
}

