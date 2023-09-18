import { Button } from "@nextui-org/react"
import React from 'react'
import { useRouter } from 'next/navigation'

export default function SuccessButton() {
    const router = useRouter();

    const handleButtonClick = () => {
        setTimeout(() => {
            router.push('/dashboard')
        }, 3000)
    }

    return (
        <>
            <Button type="submit" onClick={handleButtonClick} name="submit" className="bg-green-800 hover:bg-green-950 drop-shadow-lg transition-all duration-300">
                <p className="text-slate-300 hover:text-white font-semibold flex-1">Continue</p>
            </Button >
        </>
    )
}
