"use client"
import React from 'react'
import Image from 'next/image';
import { MyButton } from "@/components/utils/tailwindvariants/tv";
import { Company } from "@/components/constants";
import IconChanger from "@/components/lib/IconChanger";
import { iconsSrc } from "@/components/constants";

// TODO: setup nextAuth here...

export default function SocialAuth() {
    return (
        <>
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
        </>
    )
}
