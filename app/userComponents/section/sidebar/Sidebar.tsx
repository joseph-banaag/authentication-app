"use client"
import React, { useEffect, useState } from 'react'
import { userNavigation, logOut } from "@/app/userComponents/constants"
import { usePathname, useRouter } from 'next/navigation'
import {
  Link,
  Button,
  Card,
} from "@nextui-org/react";
import Topbar from "@/app/userComponents/section/navbar/Navbar";
import ProfileAvatar from "../navbar/components/ProfileAvatar";


export default function Sidebar(): React.ReactNode {
  const pathname = usePathname()
  const router = useRouter()
  const [ username, setUsername ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")
  const [ mounted, setMounted ] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const storedUser = {
    data: typeof window !== "undefined"
      ? sessionStorage.getItem("username")
      : ""
  }


  if (storedUser.data === "null" || storedUser.data === null || storedUser.data === undefined || storedUser.data === "undefined") {
    router.push("/")
  }

  const currentUserInfo = async () => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/api/users", {
        cache: "force-cache"
      })
      if (!res.ok) {
        throw new Error("Failed to fetch data")
      }
      return res.json()
    }

    const data = await getData()
    const user_name = storedUser.data

    const currentUser = data.find(({ username }: { username: string; }) => username === user_name)

    if (!currentUser) return null

    const userName = currentUser.username
    const eMail = currentUser.email

    setUsername(userName)
    setEmail(eMail)
  }

  if (pathname === "/profile" || pathname === "/security" || pathname === "/settings") {
    currentUserInfo()
    if (!currentUserInfo) return null
  }

  const logo = {
    src: "/assets/logo/user_logo.svg",
    name: "Logo"
  }

  return (
    <>
      <Card className="sidebarContainer">
        <div className="sidebarWrapper">
          <ProfileAvatar />
          <div className="ms-2 max-w-[120px]">
            <p className="text-sm font-bold truncate">{username}</p>
            <div className="overflow-hidden">
              <p className="text-xs font-thin dark: animate-scrolling-text">{email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 w-full">
          <div className="flex flex-1 flex-col gap-4 w-full">
            {userNavigation.map((item) => {
              const isActive = pathname === item.route
              return (
                <Button
                  as={Link}
                  key={item.label}
                  size="sm"
                  variant="light"
                  href={item.route}
                  className="text-medium w-full flex justify-center items-center  px-3 py-6"
                >
                  <p className={isActive
                    ? "text-foreground/90"
                    : "text-foreground/60"}>
                    {item.iconLight}
                  </p>
                  <p className={`${isActive && "isActiveStyle"} linkItems`}>{item.label}</p>
                </Button>
              )
            })}
          </div>
          <div className="mb-10">
            <Button
              as={Link}
              href={logOut.route}
              size="sm"
              variant="light"
              className="text-medium w-full flex justify-center items-center  px-3 py-6"
            >
              <p className="text-foreground/60">
                {logOut.iconLight}
              </p>
              <p className="linkItems">{logOut.label}</p>
            </Button>
          </div>
        </div>
      </Card>

      <div
        className="sidebarNavContainer !z-[1000]">
        <Topbar />
      </div>
    </>
  )
}
