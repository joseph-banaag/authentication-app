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
import { usePathname, useRouter } from 'next/navigation'
import { userNavigation } from "@/app/(user)/userComponents/constants/index"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "@/components/utils/icons/SunIcon";
import { MoonIcon } from "@/components/utils/icons/MoonIcon";
import BrandLogo from "@/app/(user)/userComponents/section/components/BrandLogo";
import NavbarUserProfile from "@/app/(user)/userComponents/section/components/NavbarUserProfile";


export default function Topbar() {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const username = "username", email = "josephrbanaag51@gmail.com", image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

    if (!username) {
        router.push("/")
    }

    return (
        <>
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
                                            <NavbarUserProfile />
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
                                        <Link href="/">
                                            <Chip
                                                variant="solid"
                                                size="sm"
                                                classNames={{
                                                    base: "bg-red-900",
                                                }}
                                                className="cursor-pointer flex flex-1 justify-center items-center"
                                            >
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
        </>
    )
}