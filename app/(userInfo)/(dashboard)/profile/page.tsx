"use client"
import React from 'react'
import { motion } from "framer-motion"


export default function Profile() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "backIn", duration: 0.5 }}
                className="w-full min-h-screen pt-20 relative"
            >
                <div className="p-5 gap-3 flex flex-1 flex-col justify-start items-center">
                    <h1 className="text-3xl">Profile settings</h1>
                    <p className="max-w-md mx-auto p-5 border rounded-2xl indent-12 text-center">This page will contain everything about the user&apos;s profile settings. This will display the user editable information:</p>
                    <div className="max-w-md px-9 mx-auto p-5 border rounded-2xl flex flex-col items-center justify-center ">
                        <ul className="list-disc">
                            <p className="mb-4">User Information:</p>
                            <li>username</li>
                            <li>email address</li>
                            <li>profile photo</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
