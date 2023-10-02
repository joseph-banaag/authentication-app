"use client"
import React from 'react'
import { motion } from "framer-motion"


export default function Settings() {
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 1 }}
        className="w-full min-h-screen pt-20"
      >
          <div className="p-5 gap-3 flex flex-1 flex-col justify-start items-center">
            <h1 className="text-3xl">Setting page</h1>
            <p className="max-w-md mx-auto p-5 border rounded-2xl indent-12 text-center">This page will contain everything about the user&apos;s settings. No idea what to add here at the moment....</p>
          </div>

      </motion.div>
    </>
  )
}
