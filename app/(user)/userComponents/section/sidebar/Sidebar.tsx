"use client"
import React from 'react'
import { userNavigation } from "@/app/(user)/userComponents/constants"
import { usePathname } from 'next/navigation'
import { Button, Card, Link } from "@nextui-org/react"
import { motion } from "framer-motion"


const Sidebar = () => {
  const pathname = usePathname()
  return (
    <>
      <Card className=" w-1/6 min-h-screen sm:flex flex-col gap-5 justify-start items-center px-8 pt-16 hidden shadow-2xl bg-background/60 dark:bg-default-100/50 rounded-none">

        {/* 
        // TODO: add user information here...
        */}
        {userNavigation.map((item) => {
          const isActive = pathname === item.route
          return (
            // TODO: change this to link to add image in front. startContent is not applicable here
            <Button
              as={Link}
              key={item.label}
              size="sm"
              variant="bordered"
              href={item.route}
              startContent={item.icon}
              className={`${isActive && "text-[#FB542B] text-2xl font-bold"} text-medium w-full flex justify-start items-center px-3 py-6`}
            >
              {item.label}
            </Button>
          )
        })}

        {/* 
        //TODO: add theme settings here and logout button
        */}

      </Card>
    </>
  )
}

export default Sidebar