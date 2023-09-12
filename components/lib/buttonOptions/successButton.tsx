import { Button } from "@nextui-org/react"
import React from 'react'
import { useRouter } from 'next/navigation'

export default function SuccessButton() {
    const router = useRouter();

    return (
        <>
            {/* 
                //todo: create a function that redirect user to sign in if the username and email address is already in use
            */}
            {/* <Button type="submit" onClick={() => router.push('/dashboard')} name="submit" className="bg-green-800 hover:bg-green-950 drop-shadow-lg transition-all duration-300">
                <p className="text-slate-300 hover:text-white font-semibold flex-1">Continue</p>
            </Button > */}

            <Button type="submit" name="submit" className="bg-green-800 hover:bg-green-950 drop-shadow-lg transition-all duration-300">
                <p className="text-slate-300 hover:text-white font-semibold flex-1">Continue</p>
            </Button >
        </>
    )
}
