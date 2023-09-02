import { Button } from "@nextui-org/react"
import React from 'react'

export default function SuccessButton() {
    return (
        <>
            <Button type="submit" name="submit" className="bg-green-800 hover:bg-green-600 drop-shadow-lg transition-all duration-300">
                <p className="text-slate-300 hover:text-white font-semibold flex-1">Continue</p>
            </Button >
        </>
    )
}
