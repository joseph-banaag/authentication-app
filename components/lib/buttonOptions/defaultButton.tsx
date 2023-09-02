import { Button } from "@nextui-org/react"
import React from 'react'

export default function DefaultButton() {
    return (
        <>
            <Button
                type="submit"
                name="submit"
                className="bg-violet-800 hover:bg-violet-950 drop-shadow-lg transition-all duration-300"
                isDisabled            
            >
                <p className="text-slate-300 hover:text-white font-semibold flex-1">Continue</p>
            </Button>
        </>
    )
}
