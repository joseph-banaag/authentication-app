"use client"
import React from 'react'
import { motion } from "framer-motion"
import { Link } from "@nextui-org/react"


export default function Dashboard() {
    const user = "Doks_23"
    return (
        <main>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "backIn", duration: 0.25 }}
            >
                <div className="w-full min-h-screen flex flex-1 flex-col justify-center items-center gap-3 relative border">
                    <h1 className="text-3xl">Welcome {user}</h1>
                    {/* 
                        // todo: create a function that will get the account information and what will be attached to the welcome screen
                    */}
                    <div>
                        <Link href="/" className="text-foreground">Go back to home</Link>
                    </div>
                </div>


            </motion.div>
        </main>
    )
}
