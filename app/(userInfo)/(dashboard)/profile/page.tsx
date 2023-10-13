"use client"
import React from "react";
import { motion } from "framer-motion"
import {
  Card,
  Button
} from "@nextui-org/react";
import { ProfileIconLight } from "@/components/utils/icons/SettingsIcon"


export default function Profile() {
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
              <ProfileIconLight className="cardIconStyle" />
              <h1 className="textHeadingResponsive">
                Profile
              </h1>
            </div>
          </Card>


        </div>
      </motion.div>
    </>
  )
}
