"use client"
import React, {
  useEffect,
  useState
} from 'react'
import { motion } from "framer-motion"
import {
  SettingsIconLightLarge,
  SettingsIconDarkLarge
} from "@/components/utils/icons/SidebarIcons"
import {
  Card,
  CardHeader,
  CardBody,
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
        className="w-full h-screen flex flex-col p-14"
      >
        <div className="w-full rounded-2xl py-2 px-6 backdrop-blur-md border border-foreground/20 bg-foreground/10">
          <div className="flex items-center justify-start gap-2">
            <AppearanceIcon />
            <h1 className="textHeading text-foreground">
              Appearance
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-2">
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
        </div>

        <Card
          className="border-none max-w-[610px]"
          shadow="sm"
        >
          <div className="flex items-center justify-start gap-2">
            <AppearanceIcon />
            <h1 className="textHeading">
              Appearance
            </h1>
          </div>

        </Card>

      </motion.div>
    </>
  )
}

{/* 

<div
  className="w-full min-h-screen p-5 flex gap-2 rounded-none bg-background dark:bg-background">
  <div className="bg-default-50 !rounded-lg shadow-xl">
    <div className="flex items-center gap-3">
      <AppearanceIcon className="w-8 h-8" />
      <h1 className="text-2xl font-semibold ">
        Appearance
      </h1>
    </div>
  </div>
  <div className="gap-1.5 bg-default-100/80 rounded-xl cardBody">
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
  </div>

  <div className="gap-1.5 bg-default-100/80 rounded-xl cardBody">
    <div className="flex gap-3">
      <h1 className="capitalize font-semibold">
        Settings 2
      </h1>
    </div>
    <p>Option 1 for Settings 2</p>
    <p>Options 2 for Settings 2</p>
  </div>


</div>

*/}