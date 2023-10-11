"use client"
import * as React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
} from "@nextui-org/react";
import { usePathname, useRouter } from 'next/navigation'
import { userNavigation } from "@/app/userComponents/constants/index"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "@/components/utils/icons/SunIcon";
import { MoonIcon } from "@/components/utils/icons/MoonIcon";
import BrandLogo from "@/app/userComponents/section/components/BrandLogo";
import ProfileAvatar from "@/components/utils/profileModal/ProfileAvatar";
import ProfileModal from "@/components/utils/profileModal/ProfileModal";
import { useModalContext } from "@/app/context/ModalContext";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "force-cache"
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export default function Topbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [ userName, setUserName ] = useState<string>("")
  const [ eMail, setEMail ] = useState<string>("")
  const [ client, setClient ] = useState<boolean>(false)
  const router = useRouter()

  const {
    displayOn,
    setDisplayOn } = useModalContext()

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

  const image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

  const storedUser = {
    data: typeof window !== "undefined" ? sessionStorage.getItem("username") : ""
  }

  if (storedUser.data === "null" || storedUser.data === null || storedUser.data === undefined || storedUser.data === "undefined") {
    router.push("/")
  }

  const getUserFromDB = async () => {
    const data = await getData()
    const user_name = storedUser.data

    const currentUser = data.find((obj: { username: string; }) => obj.username === user_name)

    if (!currentUser) return null

    const username = currentUser.username
    const email = currentUser.email

    if (pathname === "/dashboard") {
      setUserName(username)
      setEMail(email)
    }

  }

  if (pathname === "/dashboard") {
    // TODO: UNCOMMENT THIS AFTER EDITING
    getUserFromDB()
    if (!getUserFromDB) return null
  }

  return (
    <>
      <div className={`z-[48] w-full h-screen fixed backdrop-blur-sm ${displayOn ? "block" : "hidden"}`} />
      <div className={`${displayOn ? "block z-50" : "hidden"}`}>
        <ProfileModal />
      </div>
      <Navbar
        shouldHideOnScroll
        className="flex justify-around flex-wrap sm:p-3 p-0 drop-shadow-2xl">
        <NavbarContent justify="start" className="flex justify-start">
          <NavbarBrand className="flex-1 w-full justify-start flex gap-2">
            <BrandLogo />
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="flex justify-end gap-3">
          <NavbarItem className="flex justify-start items-center gap-2">
            <div onClick={() => setDisplayOn(!displayOn)}>
              <ProfileAvatar />
            </div>
            <Dropdown
              // backdrop="blur" //* blur effect affecting the function while dev tools is on
              showArrow
              classNames={{
                base: "p-0 border-small border-divider bg-background",
                arrow: "bg-background",
              }}
              className="rounded-md shadow-2xl shadow-violet-950 bg-background/90 border-md"
            >
              <DropdownTrigger>
                <div className="w-2 h-8 flex flex-col gap-1 justify-center items-center cursor-pointer">
                  <div className="w-[4px] h-[4px] rounded-full bg-[#BCBCC2] mx-auto" />
                  <div className="w-[4px] h-[4px] rounded-full bg-[#BCBCC2] mx-auto" />
                  <div className="w-[4px] h-[4px] rounded-full bg-[#BCBCC2] mx-auto" />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown section for signed in user"
              >
                <DropdownSection
                  title="Signed in as:"
                  className="text-foreground border-small border-foreground/20 p-1 rounded-md"
                >
                  <DropdownItem
                    key="profile"
                    textValue="Currently logged in user"
                    className="border-none bg-default dark:bg-default/50"
                    isReadOnly
                  >
                    <div className="flex justify-center items-center p-1 fadeIn">
                      <ProfileAvatar />
                      <div className="ms-2 max-w-[120px]">
                        <p className="text-sm font-bold truncate">{userName}</p>
                        <div className="overflow-hidden">
                          <p className="text-xs font-thin dark:text-foreground/60 animate-scrolling-text">{eMail}</p>
                        </div>
                      </div>
                    </div>
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection
                  showDivider
                  aria-label="Dropdown menu list"
                >
                  {userNavigation.map((items) => {
                    const isActive = pathname === items.route
                    return (
                      <DropdownItem
                        key={items.label}
                        textValue="Dropdown menu items"
                        className="my-1"
                      >
                        <Button
                          as={Link}
                          size="sm"
                          variant="light"
                          href={items.route}
                          className={`${isActive && "!text-[#FB542B] sm:text-lg font-bold"} text-base font-semibold text-foreground/80 w-full flex justify-start items-center !p-0`}
                        >
                          <p className={isActive ? "text-foreground/90" : "text-foreground/60"}>
                            {items.iconLight}
                          </p>
                          {items.label}
                        </Button>
                      </DropdownItem>
                    )
                  })}
                </DropdownSection>
                <DropdownSection
                  showDivider
                  aria-label="Dropdown section for current theme indicator and themes option"
                >
                  <DropdownItem
                    textValue="Dropdown current theme"
                    isReadOnly
                    variant="bordered"
                    endContent={
                      <p
                        className="z-10 outline-none w-16 rounded-md text-xs font-semibold group-data-[hover=false]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-foreground flex justify-center items-center p-1 px-1.5 capitalize"
                      >
                        {client
                          ? theme
                          : ""
                        }
                      </p>
                    }
                    className="text-foreground hover:bg-transparent border-none cursor-default"
                  >
                    <p className="text-sm font-semibold drop-shadow-md" color="foreground">Theme</p>
                  </DropdownItem>
                  <DropdownItem
                    textValue="Dropdown dark theme option"
                    variant="bordered"
                    className="hover:bg-transparent border-none cursor-default"
                  >
                    <Chip
                      onClick={changeThemeToDark}
                      endContent={<MoonIcon color="white" />}
                      variant="solid"
                      size="sm"
                      classNames={{
                        base: "bg-orange-700 hover:bg-orange-700/70 transition-all duration-300",
                      }}
                      className="cursor-pointer flex flex-1 justify-center items-center w-full"
                    >
                      <p className="text-white font-semibold text-xs">Dark</p>

                    </Chip>

                  </DropdownItem>
                  <DropdownItem
                    textValue="Dropdown light theme option"
                    variant="bordered"
                    className="hover:bg-transparent border-none cursor-default"
                  >
                    <Chip
                      onClick={changeThemeToLight}
                      endContent={<SunIcon color="white" />}
                      variant="solid"
                      size="sm"
                      classNames={{
                        base: "bg-orange-700 hover:bg-orange-500 transition-all duration-300",
                      }}
                      className="cursor-pointer flex flex-1 justify-center items-center"
                    >
                      <p className="text-white font-semibold text-xs">Light</p>
                    </Chip>
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection
                  title="Danger zone"
                  className="text-foreground"
                >
                  <DropdownItem
                    textValue="Dropdown logout button"
                    variant="bordered"
                    className="hover:bg-transparent border-none cursor-default"
                  >
                    <Link
                      href="/"
                      onClick={() => sessionStorage.clear()}
                    >
                      <Chip
                        variant="solid"
                        size="sm"
                        classNames={{
                          base: "bg-red-900",
                        }}
                        className="cursor-pointer flex flex-1 justify-center items-center"
                      >
                        {/* 
                          // TODO: create a function that will clear the localstorage once this button is pressed.
                          */}
                        <p className="text-white/90 font-semibold text-xs drop-shadow-md">Logout</p>
                      </Chip>
                    </Link>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}
