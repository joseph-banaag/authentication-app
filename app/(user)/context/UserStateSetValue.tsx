import React from 'react'
import { UserData } from "@/app/(user)/context/InfoContext"

async function getData() {
    const res = await fetch("api/users", {
        method: "GET"
    })
    if (!res.ok) {
        throw new Error("There was a problem getting the information from the API")
    }
    return res.json()
}

export default async function UserStateSetValue(user_name: string) {
    const {
        setUsername,
        setImage,
        setEmail
    } = UserData()

    console.log(user_name)

    const data = await getData()

    console.log(data)

    const getUserInfo = data.find((obj: { username: string; }) => obj.username === user_name)

    const imageTemp = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

    setUsername(getUserInfo.username)
    setEmail(getUserInfo.email)
    setImage(imageTemp)

    return (
        <>
        </>
    )
}
