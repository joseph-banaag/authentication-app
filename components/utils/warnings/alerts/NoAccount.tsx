"use client"
import React from "react";
import { Card, CardBody, Button, CardFooter } from "@nextui-org/react";
import { motion } from "framer-motion"
import SubmitSpinner from "@/components/lib/SubmitSpinner";
import { useRouter } from 'next/navigation'


export default function NoAccount() {
    const [clicked, setClicked] = React.useState(false)
    const router = useRouter()

    const handleClick = () => {
        const newClick = !clicked;
        setClicked(newClick)

        setTimeout(() => {
            router.push("/sign-up")
        }, 1000);
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 0}}
                animate={{ opacity: 1, y: 100 }}
                transition={{ delay: 1, ease: "easeOut", duration: 1 }}
            >
                <div className="p-3 fixed z-50 top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] w-full">
                    <Card
                        className="
                    border-none 
                    bg-background/70 
                    dark:bg-[#fb542b]/50
                    max-w-[620px]
                    mx-auto
                    flex-1
                    shadow-2xl
                    "
                        shadow="sm"
                    >
                        <CardBody>
                            <p className="sm:text-medium text-xs sm:font-normal font-small drop-shadow-lg tracking-wide">
                                Username and password does not exist. Please sign up to create an account...
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
                                <p className="text-slate-300 hover:text-white font-semibold flex-1 flex justify-center items-center">
                                    {clicked
                                        ? <SubmitSpinner />
                                        : "OK"}
                                </p>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </motion.div>
        </>
    );
}


