"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { userNavigation, logOut } from "@/app/userComponents/constants"
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from "next-themes";
import {
  Navbar,
  NavbarContent,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarBrand,
  Button,
  Card,
  Image
} from "@nextui-org/react";
import ProfileAvatar from "@/components/utils/profileModal/ProfileAvatar"


export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [ username, setUsername ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")
  const [ isMenuOpen, setIsMenuOpen ] = React.useState(false);

  const storedUser = {
    data: typeof window !== "undefined"
      ? sessionStorage.getItem("username")
      : ""
  }

  if (storedUser.data === "null" || storedUser.data === null || storedUser.data === undefined || storedUser.data === "undefined") {
    // router.push("/")
    // TODO: UNCOMMENT


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
    // currentUserInfo()
    // if (!currentUserInfo) return null
    // TODO: UNCOMMENT

  }

  const logo = {
    src: "/assets/logo/user_logo.svg",
    name: "Logo"
  }
  const image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

  return (
    <>
      <Card className="sidebarContainer">
        <div className="sidebarWrapper">
          <ProfileAvatar />
          <div className="ms-2 max-w-[120px]">
            <p className="text-sm font-bold truncate">{username}</p>
            <div className="overflow-hidden">
              <p className="text-xs font-thin dark:text-foreground/60 animate-scrolling-text">{email}</p>
            </div>
          </div>
        </div>

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

          <Button
            as={Link}
            href={logOut.route}
            size="sm"
            variant="light"
            className="absolute bottom-14"
          >
            <p className="text-foreground/60">
              {logOut.iconLight}
            </p>
            <p className="linkItems">{logOut.label}</p>
          </Button>
        </div>
      </Card>

      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="sidebarNavContainer">

        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden font-bold"
          />
          <NavbarBrand className="flex flex-1 ms-2">
            <Link
              href="/dashboard"
            >
              <p className="sidebarNavBrandLogo">Authentication</p>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:hidden flex flex-row-reverse">
              <Image
                src={logo.src}
                alt={logo.name}
                width={48}
                height={48}
                style={{
                  objectFit: "cover",
                }}
                className="sm:w-10 w-7 sm:h-10 h-7 border-2 rounded-md border-default-200/80"
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarMenu className="!min-w-[276px] !max-h-auto ">
          <div className="sidebarNavMenuWrapper">
            <div className="sidebarNavProfileContainer">
              <div>
                <ProfileAvatar />
              </div>
              <div className="sidebarNavProfileInfo">
                <p className="text-sm font-bold">{username}</p>
                <div className="w-full overflow-hidden">
                  <p className="text-xs font-thin dark:text-foreground/60 animate-scrolling-text delay-1000">{email}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              {userNavigation.map((item) => {
                const isActive = pathname === item.route
                return (
                  <Button
                    as={Link}
                    key={item.label}
                    size="sm"
                    variant="light"
                    href={item.route}
                    className="text-medium flex justify-start items-center px-3 py-6"
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

              <Button
                as={Link}
                href={logOut.route}
                size="sm"
                variant="light"
                className="text-medium px-3 py-6 fixed bottom-5"
              >
                <p className="text-foreground/60">
                  {logOut.iconLight}
                </p>
                <p className="linkItems">{logOut.label}</p>
              </Button>
            </div>
          </div>
        </NavbarMenu>
      </Navbar>
    </>
  )
}
