"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { MyButton } from "@/components/utils/tailwindvariants/tv";
import { iconsSrc } from "@/components/constants";
import { useTheme } from "next-themes";
import GithubDark from "@/components/lib/iconOptions/githubDark";
import GithubLight from "@/components/lib/iconOptions/githubLight";
import { Button } from "@nextui-org/react";

// TODO: setup nextAuth here...

export default function SocialAuth() {
    const { theme, setTheme } = useTheme()
    const [ client, setClient ] = useState<boolean>(false)

    useEffect(() => {
        setClient(true)
    }, [])

    return (
        <>
            <div className="flex items-center justify-evenly gap-[3px]">
                <div>
                    <Button
                        variant="flat"
                        size="md"
                        className="hover:scale-105 transition-all duration-300 shadow-xl bg-foreground/30 hover:bg-foreground/60 lg:px-unit-4 lg:min-w-unit-20 lg:h-unit-10 md:px-unit-4 md:min-w-unit-20 md:h-unit-10 sm:px-unit-4 sm:min-w-unit-20 sm:h-unit-10 x-unit-3 min-w-unit-16 h-unit-8"
                    >
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
                    </Button>
                </div>

                <div>
                    <Button
                        variant="flat"
                        size="md"
                        className="hover:scale-105 transition-all duration-300 shadow-xl bg-foreground/30 hover:bg-foreground/60 lg:px-unit-4 lg:min-w-unit-20 lg:h-unit-10 md:px-unit-4 md:min-w-unit-20 md:h-unit-10 sm:px-unit-4 sm:min-w-unit-20 sm:h-unit-10 x-unit-3 min-w-unit-16 h-unit-8"
                    >
                        {/* {client
                            ? theme === "light"
                                ? <GithubDark />
                                : <GithubLight />
                            : ""
                        } */}
                        <GithubLight />
                    </Button>
                </div>

                <div>
                    <Button
                        variant="flat"
                        size="md"
                        className="hover:scale-105 transition-all duration-300 shadow-xl bg-foreground/30 hover:bg-foreground/60 lg:px-unit-4 lg:min-w-unit-20 lg:h-unit-10 md:px-unit-4 md:min-w-unit-20 md:h-unit-10 sm:px-unit-4 sm:min-w-unit-20 sm:h-unit-10 x-unit-3 min-w-unit-16 h-unit-8"
                    >
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
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 justify-center items-center">
                <hr className='w-full border-foreground'></hr>
                <p className="sm:px-3 p-1 sm:text-medium text-xs sm:font-normal font-small text-white">or</p>
                <hr className='w-full border-foreground'></hr>
            </div>
        </>
    )
}
