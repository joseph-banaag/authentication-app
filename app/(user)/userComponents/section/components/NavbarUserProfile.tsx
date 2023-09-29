"use client"
import { useGlobalState } from '@/app/(root)/(forms)/sign-in/page'
import React, { useState } from 'react'

const getData = async () => {
    const res = await fetch("api/users")
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }
    return res.json()
}


export default function NavbarUserProfile() {
    const state = useGlobalState();
    const [useName, setUserName] = useState<string>("")
    const [eMail, setEMail] = useState<string>("")

    const getUserFromDB = async () => {
        const data = await getData()
        const user_name = state.get()

        console.log(user_name)
        
        const currentUser = data.find((obj: { username: string; }) => obj.username === user_name)

        if (!currentUser) return null

        const username = currentUser.username
        const email = currentUser.email

        setUserName(username)
        setEMail(email)
    }
    getUserFromDB()
    return (
        <>
            <div className="px-1.5 ms-2">
                <p className="text-sm font-bold">{useName}</p>
                <div className="max-w-[100px] overflow-hidden">
                    <p className="text-xs font-thin dark:text-foreground/60 animate-scrolling-text">{eMail}</p>
                </div>
            </div>
        </>
    )
}
