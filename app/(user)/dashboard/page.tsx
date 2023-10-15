"use client"
import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"

export default function Dashboard(): React.ReactNode {
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
        className="pageContainer"
      >
        <div className="p-5 gap-3 flex flex-1 flex-col justify-start items-center">
          <h1 className="textHeadingResponsive text-center">Welcome {isClient ? user : ""}</h1>
          <p className="textBaseColor">This page will contain everything about the dashboard. If the application is an e-commerce store, all items like cart items will be shown here.</p>
        </div>

      </motion.div>
    </main>
  )
}
