import React from 'react'
import { Button, Link } from "@nextui-org/react"

export default function SignUp() {
    return (
        <>
            <Button as={Link} size="sm" color="secondary" href="/sign-up" variant="flat" className="hidden sm:flex">
                Sign Up
            </Button>
        </>

    )
}
