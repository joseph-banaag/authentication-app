"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import Image from 'next/image';
import { IoLogoVimeo } from "react-icons/io5";

// this object is for type declaration of useForm() function specifically for register method.
interface Inputs {
    username: string;
    password: string;
}


// * main function here...
export default function Forms() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Inputs>();

    const App = {
        name: "Vimeo"
    }

    const iconsSrc = {
        facebook: "/assets/facebook/f_logo_RGB-Blue_250.png",
        nameFb: "facebook",
        google: "/assets/google/google.png",
        nameG: "google",
        github: "/assets/github/github.png",
        nameGit: "github",
    }

    // block below is for the functionality of watch() method
    console.log(watch("username"));
    console.log(watch("password"))
    // console.log("Errors: ", errors)

    const onSubmit: SubmitHandler<Inputs> = (data: any) => console.log(data); // the return can also be alert: alert(JSON.stringify(data))


    //TODO: implement error message to display error to the user when the condition is not met


    return (
        <div className='flex flex-col border-2 rounded-2xl md:p-11 p-5 gap-5 max-w-full md:m-11 m-5'>


            <div className='w-[8em] h-[8em]'>
                <IoLogoVimeo size={100} color="#1ab7ea" className="mt-4" />
            </div>
            <div className='p-3'>
                <h1 className="text-4xl font-medium mb-1">Create your account</h1>
                <p>to access {App.name} </p>
            </div>

            <div className=' p-3 flex justify-between gap-2'>

                <button type='button' className='rounded-2xl bg-slate-900 w-full p-3 flex justify-center  hover:bg-slate-600 transition duration-300'>
                    <Image
                        src={iconsSrc.facebook}
                        alt={iconsSrc.nameFb}
                        width={24}
                        height={24}
                    />
                </button>

                <button type='button' className='rounded-2xl bg-slate-900 w-full p-3 flex justify-center  hover:bg-slate-600 transition duration-300'>
                    <Image
                        src={iconsSrc.github}
                        alt={iconsSrc.nameGit}
                        width={24}
                        height={24}

                    />
                </button>

                <button type='button' className='rounded-2xl bg-slate-900 w-full p-3 flex justify-center  hover:bg-slate-600 transition duration-300'>
                    <Image
                        src={iconsSrc.google}
                        alt={iconsSrc.nameG}
                        width={24}
                        height={24}
                    />
                </button>

            </div>


            <div className="flex justify-center items-center">
                <hr className='w-full'></hr>
                <p className='px-3'>or</p>
                <hr className='w-full'></hr>
            </div>


        </div>
    )
}