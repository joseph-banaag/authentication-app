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


  const currentUserInfo = async () => {
    const data = await getData()
    const user_name = storedUser.data

    const currentUser = data.find(({ username }: { username: string; }) => username === user_name)

    if (!currentUser) return null

    const userName = currentUser.username
    const eMail = currentUser.email

    setUserName(userName)
    setEMail(eMail)
  }

  if (pathname === "/dashboard") {
    currentUserInfo()
    if (!currentUserInfo) return null

  }
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


  return (
    <>
      <div className={`navbarContainer 
      ${displayOn
          ? "block"
          : "hidden"
        }`} />
      <div className={`${displayOn
        ? "block z-50"
        : "hidden"
        }`}>
        <ProfileModal />
      </div>
      <Navbar
        shouldHideOnScroll
        className="navbarWrapper">
        <NavbarContent justify="start" className="flex justify-start">
          <NavbarBrand className="navbarBrand">
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
                base: "navDropdownBase",
                arrow: "bg-background",
              }}
              className="navDropdownContainer"
            >

              {/* 
              //TODO: CHANGE THE TRIGGER TO ROTATE
              the top bar will rotate clockwise and the bottom will rotate counter clockwise the middle bar will disappear.

              use transform, rotate, duration of 300ms when clicked
            
              */}
              <DropdownTrigger>
                <div className="navDropdownTriggerContainer">
                  <div className="navDropdownTrigger" />
                  <div className="navDropdownTrigger" />
                  <div className="navDropdownTrigger" />
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
                          className={`${isActive && "isActiveStyle"} linkItems`}
                        >
                          <p className={isActive
                            ? "text-foreground/90"
                            : "text-foreground/60"}>
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
                        className="themeIndicator"
                      >
                        {client
                          ? theme
                          : ""
                        }
                      </p>
                    }
                    className="themeIndicatorContainer"
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
