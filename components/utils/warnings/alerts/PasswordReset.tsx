"use client"
import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes";
import {
  Button,
} from "@nextui-org/react";
import { useModalContext } from "@/app/context/ModalContext";


const PasswordReset = (): React.ReactNode => {
  const { theme } = useTheme()
  const [ client, setClient ] = useState<boolean>(false)
  const { resetReq, setResetReq } = useModalContext()

  useEffect(() => {
    setClient(true)
  }, [])

  return (
    <>
      <Button
        onClick={() => setResetReq(!resetReq)}
        size="sm"
        variant="light"
        className="cursor-pointer max-w-fit -ms-3 !over:bg-foreground/60"
      >
        <h1 className={`text-xs sm:font-normal font-small flex justify-center items-center drop-shadow-md
        ${client
            ? theme === "dark"
              ? "text-violet-600"
              : "text-white/70"
            : ""
          }
        `}>
          Forgot password?
        </h1>
      </Button>
    </>
  )
}

export default PasswordReset