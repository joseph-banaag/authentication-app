"use client"
import React from "react";
import { Card, CardBody, Button, CardFooter } from "@nextui-org/react";
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import AlertSpinner from "@/components/lib/AlertSpinner";


export default function AccountExist() {
  const [ clicked, setClicked ] = React.useState(false)
  const router = useRouter()

  const handleClick = () => {
    const newClick = !clicked;
    setClicked(newClick)

    setTimeout(() => {
      router.push('/sign-in', { scroll: false })
    }, 1000);
  }

  return (
    <>
      <div className="p-3 fixed z-50 top-48 left-[50%] translate-x-[-50%] translate-y-[-50%] w-full">
        <Card
          className="border bg-background/70 max-w-[620px] mx-auto border-background/90 flex-1 shadow-lg shadow-background/70"
        >
          <CardBody>
            <p className="sm:text-medium text-xs sm:font-normal font-small drop-shadow-lg tracking-wide">
              You already have an account. Please sign in...
            </p>
          </CardBody>
          <CardFooter className="flex flex-row-reverse">
            <Button
              onClick={handleClick}
              color="secondary"
              size="sm"
              variant="bordered"
              className="bg-violet-800 hover:bg-violet-900 shadow-xl transition-all duration-300"
            >
              <div className="text-slate-300 hover:text-white font-semibold flex-1 flex justify-center items-center">
                {clicked
                  ? <AlertSpinner />
                  : "OK"}
              </div>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}


