"use client"
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { SettingsIconLightLarge, SettingsIconDarkLarge } from "@/components/utils/icons/SidebarIcons"
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { useTheme } from "next-themes";


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
        className="w-full min-h-screen relative p-14 mt-9"
      >
        <Card
          isBlurred
          className="w-full p-5 flex gap-2">
          <CardHeader className="bg-default/80 !rounded-lg shadow-xl">
            <div className="flex items-center gap-3">

              {client
                ? theme === "light"
                  ? <SettingsIconDarkLarge />
                  : <SettingsIconLightLarge />
                : ""
              }
              <h1 className="text-2xl font-semibold">
                Settings
              </h1>
            </div>
          </CardHeader>
          <CardBody className="gap-1.5 bg-default-100/80 rounded-xl cardBody">
            <div className="flex gap-3">
              <h1 className="capitalize font-semibold">
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
              className="w-2"
              size="sm"
            >
              Dark
            </Button>

            <Button
              type="button"
              onClick={changeThemeToLight}
              className="w-2"
              size="sm"
            >
              Light
            </Button>
          </CardBody>

          <CardBody className="gap-1.5 bg-default-100/80 rounded-xl cardBody">
            <div className="flex gap-3">
              <h1 className="capitalize font-semibold">
                Settings 2
              </h1>
            </div>
            <p>Option 1 for Settings 2</p>
            <p>Options 2 for Settings 2</p>
          </CardBody>

          {/* // * New Section  */}

          <CardHeader className="bg-default/80 !rounded-lg shadow-xl mt-6">
            <div className="flex items-center gap-3">
              {client
                ? theme === "light"
                  ? <SettingsIconDarkLarge />
                  : <SettingsIconLightLarge />
                : ""
              }
              <h1 className="text-2xl font-semibold">
                Settings Option 2
              </h1>
            </div>
          </CardHeader>
          <CardBody className="gap-1.5 bg-default-100/80 rounded-xl cardBody">
            <div className="flex gap-3">
              <h1 className="capitalize font-semibold">
                Setting 1A for Settings Option 2
              </h1>
            </div>
            <p>Option 1A for Settings 1A</p>
            <p>Option 2A for Settings 1A</p>
          </CardBody>
          <CardBody className="gap-1.5 bg-default-100/80 rounded-xl cardBody">
            <div className="flex gap-3">
              <h1 className="capitalize font-semibold">
                Settings 2A for Settings Option 2
              </h1>
            </div>
            <p>Option 1A for Settings 2A</p>
            <p>Options 2A for Settings 2A</p>
          </CardBody>
        </Card>
      </motion.div>
    </>
  )
}
