"use client"
import * as React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Avatar,
    Chip,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    DropdownSection,
    Button,
    Tooltip
} from "@nextui-org/react";
import { usePathname, useRouter } from 'next/navigation'
import Image from "next/image";
import { userNavigation } from "@/app/(user)/userComponents/constants/index"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "@/components/utils/icons/SunIcon";
import { MoonIcon } from "@/components/utils/icons/MoonIcon";


const userInfo = {
    username: "joshua_23",
    email: "email@email.com",
    image: "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"
}

export default function Topbar() {
    const pathname = usePathname()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const username = userInfo.username
    if (username === "" || username === undefined || username === null) {
        router.push('/')
    }

    const logo = {
        src: "/assets/logo/user_logo.svg",
        name: "Logo"
    }


    return (
        <Navbar
            shouldHideOnScroll
            className="flex justify-around flex-wrap p-3 drop-shadow-2xl">
            <NavbarContent justify="start" className="flex justify-start">
                <NavbarBrand className="flex-1 w-full justify-start sm:hidden flex">
                    <Link href="/dashboard">
                        <Image
                            priority
                            src={logo.src}
                            alt={logo.name}
                            width={48}
                            height={48}
                            style={{
                                objectFit: "cover",
                            }}
                            className="!max-w-[5em] !max-h-[5em] border-2 rounded-md border-default-200/80"
                        />
                    </Link>
                </NavbarBrand>
                <NavbarBrand className="flex flex-1 justify-start">
                    <Link
                        href="/dashboard"
                    >
                        <p className="lg:text-2xl md:text-xl sm:text-lg font-bold nav_name cursor-pointer sm:flex hidden drop-shadow-lg !text-[#FB542B]">Authentication</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end" className="flex justify-end gap-3">

                <NavbarItem className="flex justify-start items-center">
                    <Dropdown
                        backdrop="blur" //TODO: uncomment this for deployment
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
                                size="md"
                                src={userInfo.image}
                                className="cursor-pointer"
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
                                    <div className="flex gap-2 justify-center items-start p-1">
                                        <Avatar
                                            showFallback
                                            radius="full"
                                            isBordered
                                            isFocusable
                                            size="md"
                                            src={userInfo.image}
                                        />

                                        <div className="px-1.5">
                                            <p className="text-sm font-bold">{userInfo.username}</p>
                                            <p className="text-xs font-thin dark:text-foreground/60">{userInfo.email}</p>
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
                <NavbarItem>
                    <Tooltip
                        content="Menu on your profile photo"
                        placement="bottom-end"
                    >
                        <div className="sm:block hidden">
                            <p className="text-sm font-semibold flex justify-start items-center dark:text-foreground/80">{userInfo.username}</p>
                            <p className="text-xs font-thin dark:text-foreground/60">{userInfo.email}</p>
                            {/* 
                            
                            // TODO: display the username and email address of the currently logged in user here...
                            */}
                            {/* <UserInfo_DB /> */}
                        </div>
                    </Tooltip>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}