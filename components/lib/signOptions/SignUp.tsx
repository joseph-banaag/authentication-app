import React from 'react'
import { Button, Link } from "@nextui-org/react"

export default function SignUp() {
    return (
        <>
            <Button as={Link} size="sm" href="/sign-up" variant="flat" className="hidden sm:flex font-semibold bg-orange-700">
                Sign Up
            </Button>
        </>

    )
}
