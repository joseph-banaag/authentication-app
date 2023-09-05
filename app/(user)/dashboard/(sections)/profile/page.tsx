"use client"
import React from 'react'
import { motion } from "framer-motion"


export default function Profile() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "backIn", duration: 0.25 }}
            >
                <div className="w-full min-h-screen flex flex-1 flex-col justify-center items-center gap-3 relative">
                    <h1 className="text-3xl">Profile Section</h1>
                </div>


            </motion.div>
        </>
    )
}
