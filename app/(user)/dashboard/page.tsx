"use client"
import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"


export default function Dashboard() {
  const [ isClient, setIsClient ] = useState<boolean>(false)
  const storedUser = {
    data: typeof window !== "undefined" ? sessionStorage.getItem("username") : ""
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  const user = storedUser.data

  return (
    <main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 1 }}
        className="w-full min-h-screen pt-20 relative px-1"
      >
        <div className="p-5 gap-3 flex flex-1 flex-col justify-start items-center">
          <h1 className="text-4xl text-heading-light">Welcome {isClient ? user : ""}</h1>
          <p className="max-w-md mx-auto p-5 border border-background rounded-2xl indent-12 text-center text-slate-600">This page will contain everything about the dashboard. If the application is an e-commerce store, all items like cart items will be shown here.</p>
          {/* 
              // todo: create a function that will get the account information and what will be attached to the welcome screen
            */}
        </div>

      </motion.div>
    </main>
  )
}
