"use client"
import React from 'react'
import { useContext } from "react"
import UserContext from "@/app/(user)/context/InfoContext"

export default function UserInfo_DB() {
    const {use_email, use_username} = useContext(UserContext)

    console.log(use_email)
    console.log(use_username)

    const userDetails = () => {
        return (
            <>
                <p className="text-sm font-semibold flex justify-start items-center dark:text-foreground/80">{use_username}</p>

                <p className="text-xs font-thin dark:text-foreground/60">{use_email}</p>
            </>
        )
    }
    return (
        <>
            {userDetails()}
        </>
    )
}

