"use client"
import React, { useEffect } from 'react'
import { userNavigation, logOut } from "@/app/userComponents/constants"
import { usePathname } from 'next/navigation'
import { Button, Card, Link } from "@nextui-org/react"


const Sidebar = () => {
  const pathname = usePathname()

  useEffect(() => {
    const w = window.innerWidth
    console.log(w)
  })


  return (
    <>
      <Card className=" w-1/6 min-h-screen sm:flex flex-col gap-5 justify-start items-center px-8 pt-16 hidden shadow-2xl bg-background/60 dark:bg-default-100/50 rounded-none">

        {/* 
        // TODO: add user information here...
        */}

        {userNavigation.map((item) => {
          const isActive = pathname === item.route
          return (
            // TODO: change this to link to add image in front. startContent is not applicable here.
            // TODO: CREATE A FUNCTION THAT WILL CHANGE THE LEGEND TO JUST ICON IN SMALL SCREEN
            <Button
              as={Link}
              key={item.label}
              size="sm"
              variant="bordered"
              href={item.route}
              className="text-medium w-full flex justify-start items-center px-3 py-6"
            >
              {item.icon} <p className={`${isActive && "text-[#FB542B] text-lg font-bold"} text-medium w-full flex justify-start items-center`}>{item.label}</p>
            </Button>
          )
        })}

        {/* 
        //TODO: add theme settings here and logout button
        */}
        <Button
          as={Link}
          href={logOut.route}
          size="sm"
          variant="light"
          className="text-medium w-full px-3 py-6 absolute bottom-10"
        >
          {logOut.icon} {logOut.label}
        </Button>


      </Card>
    </>
  )
}

export default Sidebar