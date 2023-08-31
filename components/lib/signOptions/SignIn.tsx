import React from 'react'
import { Button, Link } from "@nextui-org/react"

export default function SignIn() {
  return (
    <>
      <Button as={Link} size="sm" color="secondary" href="/sign-in" variant="flat" className="hidden sm:flex">
        Sign In
      </Button>
    </>
    
  )
}
