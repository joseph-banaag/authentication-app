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
  const [ client, setClient ] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setClient(true)
  }, [])

  const storedUser = {
    data: typeof window !== "undefined"
      ? sessionStorage.getItem("username")
      : ""
  }

  if (storedUser.data === "null" || storedUser.data === null || storedUser.data === undefined || storedUser.data === "undefined") {
    // TODO: UNCOMMENT THIS AFTER EDITING
    // router.push("/")
  }

  // * GETTING INFORMATION FORM THE DATABASE
  const currentUserInfo = async () => {
    const getData = async () => {
      const res = await fetch("api/users")
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

  if (pathname === "/profile" || pathname === "/security" || pathname === "/settings") {
    // TODO: UNCOMMENT THIS AFTER EDITING
    // currentUserInfo()
    // if (!currentUserInfo) return null
  }

  const logo = {
    src: "/assets/logo/user_logo.svg",
    name: "Logo"
  }
  const image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

  return (
    <>
      <Card className=" min-h-screen md:flex hidden flex-col gap-5 justify-start items-center px-4 pt-9 shadow-2xl bg-background/60 dark:bg-default-100/50 rounded-none mx-auto ">

        <div className="flex justify-center items-center border-small border-default border-opacity-40 rounded-lg bg-default !dark:text-white py-3 px-4 mx-2 shadow-xl min-w-[200px] fadeIn">
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
                {item.iconLight}
                <p className={`${isActive && "text-[#FB542B] text-lg font-bold"} text-base w-full flex justify-start items-center`}>{item.label}</p>
              </Button>
            )
          })}

          <Button
            as={Link}
            href={logOut.route}
            size="sm"
            variant="light"
            className="w-full text-medium px-3 py-6"
          >
            {logOut.iconLight}
            <p className="text-base w-full flex justify-start items-center">{logOut.label}</p>
          </Button>
        </div>
      </Card>

      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="md:hidden flex flex-wrap p-2 drop-shadow-2xl absolute top-0 left-0 mb-9">

        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden font-bold"
          />
          <NavbarBrand className="flex flex-1 ms-2">
            <Link
              href="/dashboard"
            >
              <p className="lg:text-xl sm:text-lg font-bold cursor-pointer sm:flex hidden drop-shadow-lg !text-[#FB542B]">Authentication</p>
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
          <div className="w-auto">
            <div className="flex flex-col gap-5 justify-start items-center pt-16 !bg-none">

              <div className="flex justify-center items-center border-small border-default border-opacity-40 rounded-lg bg-default !dark:text-white sm:py-4 py-3 sm:px-6 px-4 shadow-xl">
                <div>
                  <ProfileAvatar />
                </div>
                <div className="ms-2 md:max-w-[400px] sm:max-w-[300px] truncate userProfile fadeIn">
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
                      {client
                        ? theme === "light"
                          ? item.iconDark
                          : item.iconLight
                        : ""
                      }
                      <p className={`${isActive && "text-[#FB542B] text-lg font-bold"} text-medium flex justify-start items-center`}>{item.label}</p>
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
                  {client
                    ? theme === "light"
                      ? logOut.iconDark
                      : logOut.iconLight
                    : ""
                  }
                  <p className="text-medium flex justify-start items-center">{logOut.label}</p>
                </Button>
              </div>
            </div>
          </div>
        </NavbarMenu>
      </Navbar>
    </>
  )
}
