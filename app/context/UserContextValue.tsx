import React from 'react'
import { UserDataContext } from '@/app/context/UserContext'

export default function UserContextValue(user_name: string) {
    const {
        setUsername,
        setEmail,
        setImage
    } = UserDataContext()

    console.log(user_name)

    setUsername("joshua_23")
    setEmail("josephrbanaag51@gmail.com")
    setImage("https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg")

    return (
        <>
        </>
    )
}
