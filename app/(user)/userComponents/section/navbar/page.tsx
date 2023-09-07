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
    Button
} from "@nextui-org/react";
import { usePathname, useRouter } from 'next/navigation'
import Image from "next/image";
import { userNavigation } from "@/app/(user)/userComponents/constants/index"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "@/components/utils/icons/SunIcon";
import { MoonIcon } from "@/components/utils/icons/MoonIcon";

// todo: create a function that will gather user information to complete the userinfo object:
// Todo: and then generate a logic that route the user back to '/' if there will be no userInformation

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
        <>
            <Navbar shouldHideOnScroll className="flex justify-around flex-wrap p-3">
                <NavbarContent justify="start" className="flex justify-start">
                    <NavbarBrand className="flex-1 w-full justify-start sm:hidden flex">
                        <Link href="/dashboard">
                            <Image
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

                <NavbarContent justify="end" className="flex justify-end">
                    <NavbarItem className="flex justify-start items-center">
                        <Dropdown
                            backdrop="blur"
                            aria-labelledby="dropdown"
                            aria-label="dropdown"
                            showArrow
                            classNames={{
                                base: "p-0 border-small border-divider bg-background",
                                arrow: "bg-default-200",
                            }}
                        >
                            <DropdownTrigger aria-labelledby="profile image">
                                <Avatar
                                    showFallback
                                    radius="full"
                                    isBordered
                                    isFocusable
                                    size="md"
                                    src={userInfo.image}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-labelledby="dropdown menu">
                                <DropdownSection title="Signed in as:" aria-labelledby="user information" className="sm:hidden block">
                                    <DropdownItem key="profile" className="h-14 gap-2" textValue="user information">
                                        <p className="text-sm font-bold">{userInfo.username}</p>
                                        <p className="text-xs font-thin dark:text-foreground/60">{userInfo.email}</p>
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownSection
                                    showDivider
                                    aria-labelledby="Menu Items"
                                    className="my-4"
                                >
                                    {userNavigation.map((items) => {
                                        const isActive = pathname == items.route
                                        return (

                                            <DropdownItem key={items.label} textValue="Menu items" aria-labelledby="menu list" as={Link}>
                                                <Link
                                                    color="foreground"
                                                    href={items.route}
                                                    className={`${isActive && "text-[#FB542B] text-2xl font-bold"} text-medium max-w-fit`}
                                                >
                                                    {items.label}
                                                </Link>
                                            </DropdownItem>
                                        )
                                    })}
                                </DropdownSection>
                                <DropdownSection aria-labelledby="Themes option" showDivider>
                                    <DropdownItem
                                        textValue="current theme"
                                        aria-labelledby="current theme"
                                        isReadOnly
                                        endContent={
                                            <p
                                                className="z-10 outline-none w-16 rounded-md text-xs font-semibold group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500 flex justify-center items-center p-1 px-1.5"
                                            >
                                                {theme}
                                            </p>
                                        }
                                    >
                                        <p className="text-sm font-semibold drop-shadow-md" color="foreground">Theme</p>
                                    </DropdownItem>
                                    <DropdownItem textValue="dark theme option" aria-labelledby="dark theme">
                                        <Chip
                                            onClick={() => setTheme('dark')}
                                            endContent={<MoonIcon color="white" />}
                                            variant="solid"
                                            size="sm"
                                            classNames={{
                                                base: "bg-orange-700",
                                            }}
                                            className="cursor-pointer flex flex-1 justify-center items-center"
                                        >
                                            <p className="text-white font-semibold text-xs mt-1">Dark</p>

                                        </Chip>

                                    </DropdownItem>
                                    <DropdownItem textValue="light theme option" aria-labelledby="light theme" >
                                        <Chip
                                            onClick={() => setTheme('light')}
                                            endContent={<SunIcon color="white" />}
                                            variant="solid"
                                            size="sm"
                                            classNames={{
                                                base: "bg-orange-700",
                                            }}
                                            className="cursor-pointer flex flex-1 justify-center items-center"
                                        >
                                            <p className="text-white font-semibold text-xs mt-1">Light</p>

                                        </Chip>
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownSection aria-labelledby="Log out option">
                                    <DropdownItem textValue="log out button" aria-labelledby="log out button">
                                        <Link href="/">
                                            <Chip
                                                variant="solid"
                                                size="sm"
                                                classNames={{
                                                    base: "bg-red-900",
                                                }}
                                                className="cursor-pointer flex flex-1 justify-center items-center"
                                            >
                                                <p className="text-white font-semibold text-xs">Logout</p>
                                            </Chip>
                                        </Link>
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                    <NavbarItem>
                        <div className="sm:block hidden">
                            <p className="text-sm font-semibold flex justify-start items-center">{userInfo.username}</p>
                            <p className="text-xs font-thin dark:text-foreground/60">{userInfo.email}</p>
                        </div>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>
    )
}