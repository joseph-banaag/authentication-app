"use client"
import React from 'react'
import { motion } from "framer-motion"


export default function Dashboard() {

    const user = "joshua_23"
    return (
        <main>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "backIn", duration: 0.25 }}
            >
                <div className="w-full min-h-screen pt-20 relative">
                    <div className="p-5 gap-3 flex flex-1 flex-col justify-start items-center">
                        <h1 className="text-3xl">Welcome {user}</h1>
                        <p className="max-w-md mx-auto p-5 border rounded-2xl indent-12 text-center">This page will contain everything about the dashboard. If the application is an e-commerce store, all items like cart items will be shown here.</p>
                        {/* 
                        // todo: create a function that will get the account information and what will be attached to the welcome screen
                    */}
                    </div>
                </div>

            </motion.div>
        </main>
    )
}
