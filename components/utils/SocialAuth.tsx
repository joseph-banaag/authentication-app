"use client"
import React from 'react'
import Image from 'next/image';
import { MyButton } from "@/components/utils/tailwindvariants/tv";
import IconChanger from "@/components/lib/IconChanger";
import { iconsSrc } from "@/components/constants";

// TODO: setup nextAuth here...

export default function SocialAuth() {
    return (
        <>
            <div className="flex items-center justify-center loginButtons gap-5 px-3">
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
                                objectFit: "contain",
                                width: "24px",
                                height: "24px"

                            }}
                            className="drop-shadow-md"
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
                        className="hover:scale-105 hover:bg-secondary/10 transition-all duration-300 shadow-xl flex-1">
                        <Image
                            priority
                            src={iconsSrc.google}
                            alt={iconsSrc.nameG}
                            width={24}
                            height={24}
                            style={{
                                objectFit: "contain",
                                width: "24px",
                                height: "24px"
                            }}
                            className="drop-shadow-md"
                        />
                    </MyButton>
                </div>
            </div>

            <div className="flex flex-1 justify-center items-center">
                <hr className='w-full'></hr>
                <p className="sm:px-3 p-1 sm:text-medium text-xs sm:font-normal font-small">or</p>
                <hr className='w-full'></hr>
            </div>
        </>
    )
}
