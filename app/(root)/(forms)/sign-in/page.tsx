"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import Image from 'next/image';
import { Button, Input, Card } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { MyButton } from "@/components/utils/tailwindvariants/tv";
import { bgIllustration } from "@/components/constants";
import { Company, iconsSrc } from "@/components/constants";
import IconChanger from "@/components/lib/IconChanger";
import { motion } from "framer-motion"
import PasswordReset from "@/components/(..)modals/PasswordReset";
import { useRouter } from 'next/navigation'


// this object is for type declaration of useForm() function specifically for register method.
interface Inputs {
    username: string;
    password: string;
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


    // todo: this will change the github icon depending on the set theme
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

    const user_info_db = {
        user_name: "joshua_23",
        password: "03/23/2020"
    }


    const OnSubmit: SubmitHandler<Inputs> = (data: any) => {
        const password = data.password
        const user_name = data.username

        // * given password and username will be removed from the if-statement once data from db is existing.
        const check_user_info = (): any => {
            if (password === user_info_db.password && user_name === user_info_db.user_name) {
                router.push('/dashboard', { scroll: false })
            } else {
                alert("Please create an account. Click on Sign up or reset your password if you have an account already.")
            }
        }

        return (
            <>
                {check_user_info()}
            </>
        )
    }

    console.log(watch("username"));
    console.log(watch("password"))
    console.log("Errors: ", errors)

    return (
        <> <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "backIn", duration: 0.25 }}
        >
            <div className=" w-full min-h-screen flex flex-1 flex-col justify-center items-center">
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
                            <h1 className="sm:text-4xl text-xl sm:font-medium font-normal mb-1 drop-shadow-xl">Log in</h1>
                            <p className="sm:text-medium text-xs sm:font-normal font-small drop-shadow-md">to access your {Company.name} account </p>
                        </div>
                        {/* 
                            // Todo: generate a function that will allow the sign in options facebook, google, and github
                        */}

                        <div className="flex items-center justify-evenly loginButtons">
                            <div>
                                <MyButton
                                    variant="flat"
                                    size="md"
                                    className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300 shadow-xl flex-1">
                                    <Image
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
                                    className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300 shadow-xl flex-1">
                                    <IconChanger />
                                </MyButton>
                            </div>

                            <div>
                                <MyButton
                                    variant="flat"
                                    size="md"
                                    className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300 shadow-xl flex-1">
                                    <Image
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

