"use client"
import React, {
  useEffect,
  useState
} from 'react'
import { motion } from "framer-motion"
import {
  Card,
  Button
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { AppearanceIcon } from "@/components/utils/icons/SettingsIcon"


export default function Settings() {
  const { theme, setTheme } = useTheme()
  const [ client, setClient ] = useState<boolean>(false)

  useEffect(() => {
    setClient(true)
  }, [])

  const changeThemeToLight = () => {
    setTheme("light")
    location.reload()
  }

  const changeThemeToDark = () => {
    setTheme("dark")
    location.reload()
  }

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
              <AppearanceIcon className="text-foreground/90"/>
              <h1 className="textHeading">
                Appearance
              </h1>
            </div>
          </Card>

          <div className="flex flex-col gap-2 optionList">
            <div className="flex gap-3 text-foreground/80">
              <h1 className="capitalize font-semibold ">
                Current theme :
              </h1>
              <div className="capitalize">
                {client
                  ? theme
                  : ""
                }
              </div>
            </div>
            <Button
              type="button"
              onClick={changeThemeToDark}
              className="w-2 text-foreground/80"
              size="sm"
            >
              Dark
            </Button>

            <Button
              type="button"
              onClick={changeThemeToLight}
              className="w-2 text-foreground/80"
              size="sm"
            >
              Light
            </Button>
          </div>
        </div>

        

      </motion.div>
    </>
  )
}
