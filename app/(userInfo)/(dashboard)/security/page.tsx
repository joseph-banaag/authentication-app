"use client"
import React from "react";
import { motion } from "framer-motion"
import {
  Card,
  Button
} from "@nextui-org/react";
import { SecurityIconLight } from "@/components/utils/icons/SettingsIcon"


export default function Security() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: .5 }}
        className="w-full h-screen flex flex-col p-14 md:mt-0 mt-14"
      >
        <div className="flex flex-col gap-2">
          <Card
            className="border-none w-full dark:bg-default/50 px-3 py-4 rounded-md"
            shadow="md"
          >
            <div className="flex items-center justify-start gap-2">
              <SecurityIconLight className="text-foreground/90"/>
              <h1 className="textHeading">
                Security
              </h1>
            </div>
          </Card>


        </div>
      </motion.div>
    </>
  )
}
