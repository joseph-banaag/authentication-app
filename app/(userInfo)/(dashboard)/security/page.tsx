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
        className="pageContainer"
      >
        <div className="flex flex-col gap-2">
          <Card
            className="cardContainer"
            shadow="md"
          >
            <div className="cardHeadingContainer">
              <SecurityIconLight className="cardIconStyle"/>
              <h1 className="textHeadingResponsive">
                Security
              </h1>
            </div>
          </Card>


        </div>
      </motion.div>
    </>
  )
}
