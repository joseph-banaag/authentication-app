"use server"
import React from 'react'
import { Get_username } from "@/app/api/users/route"



export default async function Value_from_form(user_name: any) {
    console.log("hello! I am from somewhere")
    console.log(user_name)
    return (
        <>
            {Get_username(user_name)}
        </>
    )

}
