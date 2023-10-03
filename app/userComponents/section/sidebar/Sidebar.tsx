"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { userNavigation, logOut } from "@/app/userComponents/constants"
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, Button, Card, Link } from "@nextui-org/react"
import SkeletonLoader from "@/components/skeletons/Loader"


export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [ username, setUsername ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")

  const storedUser = {
    data: typeof window !== "undefined" ? sessionStorage.getItem("username") : ""
  }

  if (storedUser.data === "null" || storedUser.data === null || storedUser.data === undefined || storedUser.data === "undefined") {
    router.push("/")
  }

  if (pathname === "/profile" || pathname === "/security" || pathname === "/settings") {
    const currentUserInfo = async () => {

      async function getData() {
        const res = await fetch("api/users", {
          method: "GET"
        })
        if (!res.ok) {
          throw new Error("Failed to fetch data")
        }
        return res.json()
      }

      const data = await getData()
      const user_name = storedUser.data

      const currentUser = data.find((obj: { username: string; }) => obj.username === user_name)


      if (!currentUser) return null

      const userName = currentUser.username
      const eMail = currentUser.email

      setUsername(userName)
      setEmail(eMail)
    }
    currentUserInfo();
  }

  const image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

  return (
    <>
      <Card className=" w-1/6 min-h-screen sm:flex flex-col gap-5 justify-start items-center px-8 pt-16 hidden shadow-2xl bg-background/60 dark:bg-default-100/50 rounded-none">

        <div className="w-full flex justify-center items-center border-small border-default border-opacity-40 rounded-lg bg-default !dark:text-white py-6 ">
          <Avatar
            showFallback
            radius="full"
            isBordered
            isFocusable
            src={image}
            className="cursor-pointer sm:w-8 w-6 sm:h-8 h-6"
          />
          <Suspense fallback={<SkeletonLoader />}>
            <div className="px-1.5 ms-2 overflow-hidden">
              <p className="text-sm font-bold">{username}</p>
              <div className="max-w-[100px] overflow-hidden">
                <p className="text-xs font-thin dark:text-foreground/60 animate-scrolling-text">{email}</p>
              </div>
            </div>
          </Suspense>
        </div>

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
              {item.iconLight} <p className={`${isActive && "text-[#FB542B] text-lg font-bold"} text-medium w-full flex justify-start items-center`}>{item.label}</p>
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
          variant="bordered"
          className="w-full text-medium px-3 py-6 -bottom-72"
        >
          {logOut.icon} {logOut.label}
        </Button>


      </Card>
    </>
  )
}
