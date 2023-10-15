"use client"
import React, { useState } from "react";
import { motion } from "framer-motion"
import {
  Card,
  Button
} from "@nextui-org/react";
import { SecurityIconLight } from "@/components/utils/icons/SettingsIcon"
import { DeleteIcon } from "@/components/utils/icons/DeleteIcon"
import Link from "next/link";


export default function Security(): React.ReactNode {
  const [ isChanged, setIsChanged ] = useState<boolean>(false)

  const handleAccountDeletion = () => {
    console.log("account deleted successfully!")


    // TODO: create a modal with the confirmation of account deletion and then add the delete logic to the modal in the middle of the page  

  }
  {/* 
  // TODO: create another content below delete account option about when the password was updated and the account information was changed. get the data from the updated_on date.

  create a check. if there is no update happened to the account return no account changes made

  if the updated_on !== 0 return the last update on your account was on updated_on date

*/}
  const updatedOn = "October 14, 2023"

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: .5 }}
        className="pageContainer "
      >
        <div className="flex flex-col gap-2 ">
          <Card
            className="cardContainer "
            shadow="md"
          >
            <div className="cardHeadingContainer">
              <SecurityIconLight className="cardIconStyle" />
              <h1 className="textHeadingResponsive">
                Security
              </h1>
            </div>
          </Card>

          <div className="cardContentWrapper ">
            <div className="flex flex-col gap-1">
              <h1 className="textHeading2Responsive">Last Update on your account</h1>
              <p
                className="smallTextColor"
              >
                This will indicate changes on your account.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className=" w-[95%] mx-auto">
                {!isChanged
                  ? <h1 className="textBaseColor">
                    The last changes on your account happened on: <b>{updatedOn}</b>
                  </h1>
                  : <h1 className="textBaseColor">No changes on your account yet.</h1>
                }
              </div>
              
              <div className="flex flex-col gap-1">
                <p className="text-foreground/70 text-sm font-normal drop-shadow-md">Go to your profile to keep your account updated.</p>
                <Link
                  href="/profile"
                  className="underline underline-offset-4 font-medium"
                >
                  Update your account
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-10">
          <div className="cardContentWrapper">
            <h1 className="textHeading2Responsive">Deactivate</h1>
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
