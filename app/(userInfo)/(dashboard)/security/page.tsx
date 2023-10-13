"use client"
import React from "react";
import { motion } from "framer-motion"
import {
  Card,
  Button
} from "@nextui-org/react";
import { SecurityIconLight } from "@/components/utils/icons/SettingsIcon"
import { DeleteIcon } from "@/components/utils/icons/DeleteIcon"

export default function Security() {


  const handleAccountDeletion = () => {
    console.log("account deleted successfully!")


    // TODO: create a modal with the confirmation of account deletion and then add the delete logic to the modal in the middle of the page  

  }

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
              <SecurityIconLight className="cardIconStyle" />
              <h1 className="textHeadingResponsive">
                Security
              </h1>
            </div>
          </Card>

          <div className="cardContentWrapper">
            <h1 className="textHeading2Responsive">Deactivate your account</h1>

            <div className="flex flex-col gap-2">
              <div
                className="smallTextColor"
              >
                <b className="text-red-500">WARNING:</b> The process of deleting your account is irreversible. Proceed with cautions.
              </div>
              <Button
                onClick={handleAccountDeletion}
                size="sm"
                variant="light"
                className="text-sm font-medium  shadow-xl tracking-normal text-white/80 transform hover:scale-105 transition-all duration-300 w-[90px] cursor-pointer flex justify-center items-center bg-red-500/70"
              >
                <div className="drop-shadow-lg flex justify-center items-center">
                  Delete <DeleteIcon />
                </div>
              </Button>

            </div>
          </div>

        </div>
      </motion.div>
    </>
  )
}
