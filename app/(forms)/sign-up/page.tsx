"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import Image from 'next/image';
import { IoLogoVimeo } from "react-icons/io5";
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { MyButton } from "@/components/utils/tailwindvariants/tv";
import { bgIllustration } from "@/components/constants";
import { Company } from "@/components/constants";

// this object is for type declaration of useForm() function specifically for register method.
interface Inputs {
    username: string;
    password: string;
    fullName: string;
    confirmPw: string;

}

// * main function here...
export default function SignUp() {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isConfirmed, setIsConfirmed] = React.useState(false);
    const [isDark, setIsDark] = React.useState(true);
    const [isMatched, setIsMatched] = React.useState(false)

    // todo: this will change the github icon depending on the set theme
    const changeIcon = () => {
        return (
            setIsDark(!isDark)
        )
    }
    // todo: this will change the color of the continue button if the password confirmation is the same 
    const checkMatchedPw = () => setIsMatched(!isMatched)


    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleIsConfirmed = () => setIsConfirmed(!isConfirmed)


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Inputs>();



    const onSubmit: SubmitHandler<Inputs> = (data: any) => {
        return (
            //todo: create a check state that will check if the password is match to confirmPw and make the continue button green
            console.log(data) // the return can also be alert: alert(JSON.stringify(data))
        )
    }

    const iconsSrc = {
        facebook: "/assets/facebook/f_logo_RGB-Blue_250.png",
        nameFb: "facebook",
        google: "/assets/google/google.png",
        nameG: "google",
        github: "/assets/github/github-mark-white.png",
        githubDark: "/assets/github/github.png",
        nameGit: "github",
    }


    console.log(watch("fullName"));
    console.log(watch("username"));
    console.log(watch("password"))
    console.log(watch("confirmPw"))
    console.log("Errors: ", errors)

    return (
        <>
            <div className="w-full min-h-screen flex flex-1 flex-col justify-center items-center mt-10">
                <div className=" sm:p-2 p-5">
                    <div className="flex flex-col flex-1 border-2 border-slate-600 rounded-2xl p-1.5 sm:p-5 gap-5 mb-24" id="sign-in">
                        {/* other logins*/}

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
                            <h1 className="sm:text-4xl text-xl sm:font-medium font-normal mb-1">Create your account</h1>
                            <p className="sm:text-medium text-xs sm:font-normal font-small">to access {Company.name} </p>
                        </div>

                        <div className="flex flex-wrap justify-center items-center sm:gap-5 gap-4 ">
                            <div>
                                <MyButton
                                    variant="flat"
                                    size="md"
                                    className="hover:scale-105 hover:bg-primary/40 transition-all duration-300 backdrop-blur-xl drop-shadow-lg flex-1">
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
                                    className="hover:scale-105 hover:bg-primary/40 transition-all duration-300 backdrop-blur-xl drop-shadow-lg flex-1">
                                    {/* 
                                        //Todo: create a logic that will check the theme and apply the icon for its theme
                                    */}
                                    {isDark
                                        ? <Image
                                            priority
                                            src={iconsSrc.github}
                                            alt={iconsSrc.nameGit}
                                            width={24}
                                            height={24}
                                            style={{
                                                objectFit: "cover"
                                            }}
                                            className="drop-shadow-lg "
                                        />
                                        : <Image
                                            priority
                                            src={iconsSrc.githubDark}
                                            alt={iconsSrc.nameGit}
                                            width={24}
                                            height={24}
                                            style={{
                                                objectFit: "cover"
                                            }}
                                            className="drop-shadow-lg "
                                        />}
                                </MyButton>
                            </div>

                            <div>
                                <MyButton
                                    variant="flat"
                                    size="md"
                                    className="hover:scale-105 hover:bg-primary/40 transition-all duration-300 backdrop-blur-xl drop-shadow-lg flex-1">
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
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-0' id="sign-in">

                            <div className='flex flex-col gap-1 mb-3'>
                                <Input
                                    isRequired
                                    type="text"
                                    label="Full Name"
                                    variant="bordered"
                                    className="w-full flex-1"
                                    classNames={{
                                        label: "text-default sm:text-medium text-xs sm:font-normal font-small",
                                        input: "sm:text-medium text-sm sm:font-normal font-normal",

                                    }}
                                    {...register("fullName")}
                                />

                            </div>

                            <div className='flex flex-col gap-1 mb-3'>
                                <Input
                                    isRequired
                                    type="text"
                                    label="Username"
                                    variant="bordered"
                                    className="w-full flex-1"
                                    classNames={{
                                        label: "text-default sm:text-medium text-xs sm:font-normal font-small",
                                        input: "sm:text-medium text-sm sm:font-normal font-normal",

                                    }}
                                    {...register("username")}
                                />

                            </div>

                            <div className='flex flex-col gap-1 mb-3'>
                                <Input
                                    isRequired
                                    label="Password"
                                    variant="bordered"
                                    placeholder="Enter your password"
                                    classNames={{
                                        label:
                                            "text-default sm:text-sm text-xs sm:font-normal font-small",
                                        input: [
                                            "sm:text-medium text-sm sm:font-normal font-normal",
                                            "placeholder:text-default-700/50 sm:text-sm text-xs dark:placeholder:text-white/60",
                                        ]

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
                                    {...register("password")}
                                    name="password"
                                />
                            </div>

                            <div className='flex flex-col gap-1 mb-3'>
                                <Input
                                    isRequired
                                    label="Confirm"
                                    variant="bordered"
                                    placeholder="Confirm your password"
                                    classNames={{
                                        label:
                                            "text-default sm:text-sm text-xs sm:font-normal font-small",
                                        input: [
                                            "sm:text-medium text-sm sm:font-normal font-normal",
                                            "placeholder:text-default-700/50 sm:text-sm text-xs dark:placeholder:text-white/60",
                                        ]

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
                                    {...register("confirmPw")}
                                    name="confirmPw"
                                />
                            </div>

                            <div className='flex flex-col gap-1 mb-3'>
                                {/* 
                                    //Todo: this will change the button from violet to green when password matches
                                */}
                                {isMatched
                                    ? <Button type="submit" name="submit" className="bg-green-800 hover:bg-green-600 drop-shadow-lg transition-all duration-300">
                                        <p className="text-slate-300 hover:text-white font-semibold flex-1">Continue</p>
                                    </Button>
                                    : <Button type="submit" name="submit" className="bg-violet-800 hover:bg-violet-950 drop-shadow-lg transition-all duration-300">
                                        <p className="text-slate-300 hover:text-white font-semibold flex-1">Continue</p>
                                    </Button>
                                }

                            </div>
                        </form>
                    </div>


                </div>
            </div>

            <div className="flex md:flex-row flex-col justify-center items-center p-10 z-0 mb-10 md:gap-11 gap-5">
                <h1 className="sm:text-2xl text-medium font-bold text-secondary/90 ">Create connection</h1>
                <Image
                    priority
                    src={bgIllustration.connect.src}
                    alt={bgIllustration.connect.name}
                    width={400}
                    height={400}
                />
            </div>

        </>
    )
}

