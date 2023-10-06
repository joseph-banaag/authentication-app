"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { MyButton } from "@/components/utils/tailwindvariants/tv";
import { iconsSrc } from "@/components/constants";
import { useTheme } from "next-themes";
import GithubDark from "@/components/lib/iconOptions/githubDark";
import GithubLight from "@/components/lib/iconOptions/githubLight";

// TODO: setup nextAuth here...

export default function SocialAuth() {
    const { theme, setTheme } = useTheme()
    const [ client, setClient ] = useState<boolean>(false)

    useEffect(() => {
        setClient(true)
    }, [])

    return (
        <>
            <div className="flex items-center justify-center loginButtons gap-5 px-3">
                <div>
                    <MyButton
                        variant="flat"
                        size="md"
                        className="hover:scale-105 transition-all duration-300 flex-1 shadow-xl bg-foreground/30 hover:bg-foreground/60">
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
                        className="hover:scale-105 transition-all duration-300 flex-1 shadow-xl bg-foreground/30 hover:bg-foreground/60"
                    >
                        {/* {client
                            ? theme === "light"
                                ? <GithubDark />
                                : <GithubLight />
                            : ""
                        } */}
                        <GithubLight />
                    </MyButton>
                </div>

                <div>
                    <MyButton
                        variant="flat"
                        size="md"
                        className="hover:scale-105 transition-all duration-300 flex-1 shadow-xl bg-foreground/30 hover:bg-foreground/60">
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
                <hr className='w-full border-foreground'></hr>
                <p className="sm:px-3 p-1 sm:text-medium text-xs sm:font-normal font-small text-white">or</p>
                <hr className='w-full border-foreground'></hr>
            </div>
        </>
    )
}
