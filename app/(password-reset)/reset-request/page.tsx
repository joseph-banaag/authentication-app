"use client"
import Link from "next/link"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@nextui-org/react"

export default function ResetPassword() {
    const router = useRouter()
    return (
        <>
            <h1>
                {/* 
                // Todo: 
                */}
                create a form for password reset
            </h1>
            <Button type="button" onClick={() => router.push("/sign-in")}>Home</Button>
        </>

    )
}
