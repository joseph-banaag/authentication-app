"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import Image from 'next/image';
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { MyButton } from "@/components/utils/tailwindvariants/tv";
import { bgIllustration } from "@/components/constants";
import { Company } from "@/components/constants";
import IconChanger from "@/components/lib/IconChanger";
import { iconsSrc } from "@/components/constants";
import SuccessButton from "@/components/lib/buttonOptions/successButton";
import DefaultButton from "@/components/lib/buttonOptions/defaultButton";

// this object is for type declaration of useForm() function specifically for register method.
interface Inputs {
    username: string;
    password: string;
    email: string;
    confirmPw: string;

}

// * main function here...
export default function SignUp() {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isConfirmed, setIsConfirmed] = React.useState(false);

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

    console.log(watch("email"));
    console.log(watch("username"));
    console.log(watch("password"))
    console.log(watch("confirmPw"))
    console.log("Errors: ", errors)

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


    const onSubmit: SubmitHandler<Inputs> = (data: any) => {
        const password = data.password
        const confirmed = data.confirmPw

        const beforeSubmit = () => {
            if (password !== confirmed) {
                alert("Please check your password!")
            } else {
                alert("Congratulations!")
                console.log(data)
            }
        }
        return (
            <>
                {beforeSubmit()}
            </>
        )
    }


    return (
        <>
            <div className=" motion-safe:animate-appearance-in w-full min-h-screen flex flex-1 flex-col justify-center items-center mt-10 ">
                <div className=" sm:p-2 p-5">
                    <div className="flex flex-col flex-1 border-2 border-slate-600 rounded-2xl p-1.5 sm:p-5 gap-5 mb-24 shadow-lg" id="sign-in">
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

                        {/* 
                            // Todo: generate a function that will allow the sign in options facebook, google, and github
                        */}
                        <div className="flex flex-wrap justify-center items-center sm:gap-5 gap-4 ">
                            <div>
                                <MyButton
                                    variant="flat"
                                    size="md"
                                    className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300 backdrop-blur-xl drop-shadow-lg flex-1">
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
                                    className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300 backdrop-blur-xl drop-shadow-lg flex-1"
                                >
                                    <IconChanger />
                                </MyButton>
                            </div>

                            <div>
                                <MyButton
                                    variant="flat"
                                    size="md"
                                    className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300 backdrop-blur-xl drop-shadow-lg flex-1">
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
                                    id="username"
                                    isClearable
                                    type="text"
                                    label="Username"
                                    variant="bordered"
                                    className="w-full flex-1"
                                    classNames={{
                                        label: "text-default-800/80  sm:text-medium text-xs sm:font-normal font-small",
                                        input: "sm:text-medium text-sm sm:font-normal font-normal",

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

                            <div className='flex flex-col gap-1 mb-3'>
                                <Input
                                    id="email"
                                    isClearable
                                    type="email"
                                    label="E-mail"
                                    variant="bordered"
                                    className="w-full flex-1"
                                    classNames={{
                                        label: "text-default-800/80  sm:text-medium text-xs sm:font-normal font-small",
                                        input: "sm:text-medium text-sm sm:font-normal font-normal",

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

                            <div className='flex flex-col gap-1 mb-3'>
                                <Input
                                    id="password"
                                    label="Password"
                                    variant="bordered"
                                    placeholder="Enter your password"
                                    classNames={{
                                        label:
                                            "text-default-800/80  sm:text-sm text-xs sm:font-normal font-small",
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

                            <div className='flex flex-col gap-1 mb-5'>
                                <Input
                                    id="confirm"
                                    label="Confirm"
                                    variant="bordered"
                                    placeholder="Confirm your password"
                                    classNames={{
                                        label:
                                            "text-default-800/80  sm:text-sm text-xs sm:font-normal font-small",
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
                                    {...register("confirmPw", {
                                        pattern: /(?=\w{5,18})(?=\D*\d)/,
                                        required: true
                                    })}
                                    name="confirmPw"
                                />
                                {validatePassword()}

                            </div>

                            <div className='flex flex-col gap-1 mb-3'>

                                <ButtonChanger />

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

