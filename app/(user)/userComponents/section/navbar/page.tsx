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
  Avatar,
} from "@nextui-org/react";
import { motion } from "framer-motion"
import { usePathname, useRouter } from 'next/navigation'
import { userNavigation } from "@/app/(user)/userComponents/constants/index"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "@/components/utils/icons/SunIcon";
import { MoonIcon } from "@/components/utils/icons/MoonIcon";
import BrandLogo from "@/app/(user)/userComponents/section/components/BrandLogo";
import { useGlobalState } from "@/app/hookstate/HookState";

const getData = async () => {
  const res = await fetch("api/users")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export default function Topbar() {
  const pathname = usePathname()
  const [ mounted, setMounted ] = useState(false)
  const { theme, setTheme } = useTheme()
  const [ userName, setUserName ] = useState<string>("")
  const [ eMail, setEMail ] = useState<string>("")
  const router = useRouter()
  const state = useGlobalState();

  const handleClearStorage = () => {
    sessionStorage.clear();
  };

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

  const currentUser = state.get()

  if (currentUser === "null" || currentUser === null || currentUser === undefined || currentUser === "undefined") {
    router.push("/")
  }

  const getUserFromDB = async () => {
    const data = await getData()
    const user_name = state.get()

    const currentUser = data.find((obj: { username: string; }) => obj.username === user_name)

    if (!currentUser) return null

    const username = currentUser.username
    const email = currentUser.email

    setUserName(username)
    setEMail(email)
  }
  getUserFromDB()


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "backIn", duration: 1 }}
      >
        <Navbar
          shouldHideOnScroll
          className="flex justify-around flex-wrap sm:p-3 p-0 drop-shadow-2xl">
          <NavbarContent justify="start" className="flex justify-start">
            <NavbarBrand className="flex-1 w-full justify-start flex gap-2">
              <BrandLogo />
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent justify="end" className="flex justify-end gap-3">

            <NavbarItem className="flex justify-start items-center">
              <Dropdown
                // backdrop="blur" //TODO: uncomment this for deployment
                showArrow
                classNames={{
                  base: "p-0 border-small border-divider bg-background",
                  arrow: "bg-default-200",
                }}
              >
                <DropdownTrigger>
                  <Avatar
                    showFallback
                    radius="full"
                    isBordered
                    isFocusable
                    src={image}
                    className="cursor-pointer sm:w-8 w-6 sm:h-8 h-6"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dropdown section for signed in user"
                >
                  <DropdownSection
                    title="Signed in as:"
                    className="block border-small border-neutral-400 border-opacity-40 rounded-lg !light:bg-default !dark:text-white p-1"
                  >
                    <DropdownItem
                      key="profile"
                      textValue="Currently logged in user"
                      className="!bg-default"
                      isReadOnly
                    >
                      <div className="flex justify-center items-center p-1">
                        <Avatar
                          showFallback
                          radius="full"
                          isBordered
                          isFocusable
                          src={image}
                          className="cursor-pointer sm:w-8 w-6 sm:h-8 h-6"
                        />

                        <div className="px-1.5 ms-2">
                          <p className="text-sm font-bold">{userName}</p>
                          <div className="max-w-[100px] overflow-hidden">
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
                      const isActive = pathname == items.route
                      return (
                        <DropdownItem
                          key={items.label}
                          textValue="Dropdown menu items"
                        >
                          <Button
                            as={Link}
                            // color="foreground"
                            size="sm"
                            variant="light"
                            href={items.route}
                            className={`${isActive && "text-[#FB542B] text-2xl font-bold"} text-medium w-full flex justify-start items-center`}
                          >
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
                          className="z-10 outline-none w-16 rounded-md text-xs font-semibold group-data-[hover=false]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500 flex justify-center items-center p-1 px-1.5"
                        >
                          {theme}
                        </p>
                      }
                      className="hover:bg-transparent border-none cursor-default"
                    >
                      <p className="text-sm font-semibold drop-shadow-md" color="foreground">Theme</p>
                    </DropdownItem>
                    <DropdownItem
                      textValue="Dropdown dark theme option"
                      variant="bordered"
                      className="hover:bg-transparent border-none cursor-default"
                    >
                      <Chip
                        onClick={() => setTheme('dark')}
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
                        onClick={() => setTheme('light')}
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
                  >
                    <DropdownItem
                      textValue="Dropdown logout button"
                      variant="bordered"
                      className="hover:bg-transparent border-none cursor-default"
                    >
                      <Link
                        href="/"
                        onClick={handleClearStorage}
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
                          <p className="text-white font-semibold text-xs hover:text-yellow-500">Logout</p>
                        </Chip>
                      </Link>
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </motion.div>
    </>
  )
}
