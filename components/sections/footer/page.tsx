"use client"
import React from 'react'
import { Link } from "@nextui-org/react"

export default function Footer() {
    return (
        <div className="flex flex-1 flex-col justify-center items-center p-[1em] bg-violet-950 gap-1.5">
            <h1 className="text-xs text-slate-300 text-center">This is not an actual sign in page of the company. The logo and name are just placeholders for UI purposes only.</h1>
            <p className="text-xs text-slate-300 text-center ">This is an online illustration by <Link href="https://storyset.com/online" className="text-violet-500 underline underline-offset-4 cursor-pointer text-xs font-semibold">Storyset</Link></p>
        </div>
    )
}