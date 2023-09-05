"use client"
import React from 'react'
import { motion } from "framer-motion"
import { Link } from "@nextui-org/react"


export default function Dashboard() {
    return (
        <main>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "backIn", duration: 0.25 }}
            >
                <div className="w-full min-h-screen flex flex-1 flex-col justify-center items-center gap-3">
                    <h1>User home page</h1>
                    <div>
                        <Link href="/" className="text-foreground">Go back to home</Link>
                    </div>
                </div>


            </motion.div>
        </main>
    )
}
