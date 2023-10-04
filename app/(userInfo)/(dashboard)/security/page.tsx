"use client"
import React from 'react'
import { motion } from "framer-motion"

export default function Security() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 0.5 }}
        className="w-full min-h-screen mt-28 relative"
      >
          <div className="p-5 gap-3 flex flex-1 flex-col justify-start items-center">
            <h1 className="text-3xl">Security page</h1>
            <p className="max-w-md mx-auto p-5 border rounded-2xl indent-12 text-center">This page will contain everything about the user&apos;s security settings. This includes all editable information related to the user</p>
            <div className="max-w-md mx-auto p-5 px-9 border rounded-2xl flex flex-col items-center justify-center ">
              <ul className="list-disc">
                <p className="mb-4">User Information:</p>
                <li>Physical / Home Address</li>
                <li>Contact information</li>
                <li>2FA</li>
              </ul>
            </div>
          </div>
      </motion.div>
    </>
  )
}
