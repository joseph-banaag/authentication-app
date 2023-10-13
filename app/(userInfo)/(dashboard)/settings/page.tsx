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
        className="pageContainer"
      >
        <div className="flex flex-col gap-2">
          <Card
            className="cardContainer"
            shadow="md"
          >
            <div className="cardHeadingContainer">
              <AppearanceIcon className="cardIconStyle" />
              <h1 className="textHeadingResponsive">
                Appearance
              </h1>
            </div>
          </Card>

          <div className="cardContentWrapper">
            <div className="flex gap-3 textBaseColor">
              <h1 className="capitalize textHeading2Responsive">
                Current theme:
              </h1>
              <div className="capitalize textBaseColor flex justify-center items-center ">
                {client
                  ? theme
                  : ""
                }
              </div>
            </div>
            <Button
              type="button"
              onClick={changeThemeToDark}
              className="w-2 textBaseColor"
              size="sm"
            >
              Dark
            </Button>

            <Button
              type="button"
              onClick={changeThemeToLight}
              className="w-2 textBaseColor"
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
