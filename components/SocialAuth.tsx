"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { iconsSrc } from "@/components/constants";
import { useTheme } from "next-themes";
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
                        className="socialButton"
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
                        className="socialButton"
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
                        className="socialButton"
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
