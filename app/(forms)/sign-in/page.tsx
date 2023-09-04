"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import Image from 'next/image';
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/utils/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/utils/icons/EyeSlashFilledIcon";
import { MyButton } from "@/components/utils/tailwindvariants/tv";
import { bgIllustration } from "@/components/constants";
import { Company, iconsSrc } from "@/components/constants";
import IconChanger from "@/components/lib/IconChanger";
import Link from "next/link";

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



    const onSubmit: SubmitHandler<Inputs> = (data: any) => console.log(data); // the return can also be alert: alert(JSON.stringify(data))


    console.log(watch("username"));
    console.log(watch("password"))
    console.log("Errors: ", errors)

    return (
        <>
            <div className=" motion-safe:animate-appearance-in w-full min-h-screen flex flex-1 flex-col justify-center items-center">
                <div className="p-5">
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
                            <h1 className="sm:text-4xl text-xl sm:font-medium font-normal mb-1">Log in</h1>
                            <p className="sm:text-medium text-xs sm:font-normal font-small">to access your {Company.name} account </p>
                        </div>
                        {/* 
                            // Todo: generate a function that will allow sign in using these options
                        */}

                        <div className="flex flex-wrap justify-center items-center sm:gap-5 gap-2 ">
                            <div>
                                <MyButton
                                    variant="flat"
                                    size="md"
                                    className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300 backdrop-blur-xl drop-shadow-lg flex-1">
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
                                    className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300 backdrop-blur-xl drop-shadow-lg flex-1">
                                    <IconChanger />
                                </MyButton>
                            </div>

                            <div>
                                <MyButton
                                    variant="flat"
                                    size="md"
                                    className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300 backdrop-blur-xl drop-shadow-lg flex-1">
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
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3' id="sign-in">

                            <div className='flex flex-col gap-1'>
                                <Input
                                    id="username"
                                    type="text"
                                    label="Username"
                                    isClearable
                                    variant="bordered"
                                    className="w-full flex-1"
                                    classNames={{
                                        label: "text-default-800/80  sm:text-medium text-xs sm:font-normal font-small",
                                        input: "sm:text-medium text-sm sm:font-normal font-normal",

                                    }}
                                    {...register("username", {
                                        required: true
                                    })}
                                />
                                {/* 
                                    //todo: generate a function that will check if the user input is matched with the user information from db
                                */}
                                <p className="text-xs text-red-400">
                                    {errors.username?.types?.required && <span>Username is required</span>}
                                </p>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <div>
                                    <Link href="/reset-request" className="cursor-pointer text-violet-600 bg-focus ">
                                        <h1 className="text-xs sm:font-normal font-small w-full flex flex-row-reverse">Forgot password?</h1>
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    label="Password"
                                    variant="bordered"
                                    placeholder="Enter your password"
                                    classNames={{
                                        label:
                                            "text-default-800/80 sm:text-sm text-xs sm:font-normal font-small",
                                        input: [
                                            "sm:text-medium text-sm sm:font-normal font-normal",
                                            "placeholder:text-default-800/80 sm:text-sm text-xs dark:placeholder:text-white/60",
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
                                    //todo: generate a function that will check if the user input is matched with the user information from db
                                */}
                                <p className="text-xs text-red-400">
                                    {errors.password?.types?.required && <span>Password is required</span>}
                                </p>

                            </div>

                            <div className='flex flex-col gap-1 mb-3'>
                                {/* 
                                    // Todo: create a matching function that will change the button to green if the password from the user is matched with the user information form db
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

                    </div>
                </div>
            </div>

            <div className="flex md:flex-row flex-col justify-center items-center p-10 z-0 mb-10 md:gap-11 gap-5">
                <h1 className="sm:text-2xl text-medium font-bold text-secondary/90 ">Connect with the community</h1>
                <Image
                    src={bgIllustration.group.src}
                    alt={bgIllustration.group.name}
                    width={400}
                    height={400}
                />
            </div>

        </>
    )
}

