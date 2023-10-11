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
        className="w-full min-h-screen lg:p-14 relative px-1"
      >
        <div className="p-5 gap-3 flex flex-1 flex-col justify-start items-center">
          <h1 className="textHeading">Welcome {isClient ? user : ""}</h1>
          <p className="">This page will contain everything about the dashboard. If the application is an e-commerce store, all items like cart items will be shown here.</p>

          {/* 
              // todo: create a function that will get the account information and what will be attached to the welcome screen
            */}
        </div>

      </motion.div>
    </main>
  )
}
