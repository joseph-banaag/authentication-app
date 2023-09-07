"use client"

import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Avatar,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Chip,
    user,
} from "@nextui-org/react";
import { userNavigation } from "@/app/(user)/userComponents/constants/index"
import { usePathname, useRouter } from 'next/navigation'
import { ThemeSwitcher } from "@/components/toggle/ThemeSwitcher";
import { useAnimationFrame } from "framer-motion";

// todo: create a function that will gather user information to complete the userinfo object:
// Todo: and then generate a logic that route the user back to '/' if there will be no userInformation

const userInfo = {
    username: "Doks_23",
    email: "email@email.com",
    image: "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"
}

export default function Topbar() {
    const router = useRouter()

    const username = userInfo.username

    if (username === "" || username === undefined || username === null) {
        router.push('/')
    }

    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <>
            <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll className="flex flex-wrap p-3">
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand className="flex flex-1">
                        <Link
                            href="/dashboard"
                            color="foreground"
                        >
                            <p className="lg:text-2xl md:text-xl sm:text-lg font-bold text-inherit nav_name cursor-pointer sm:flex hidden">Authentication</p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent justify="end" className="flex">
                    <NavbarItem className="hidden">
                        <Link color="foreground" href="/dashboard/security">
                            Security
                        </Link>
                    </NavbarItem>
                    <NavbarItem className="flex">
                        <Avatar
                            showFallback
                            radius="full"
                            isBordered
                            isFocusable
                            size="sm"
                            src={userInfo.image}
                        />
                        <div className="hidden">
                            <p className="text-sm font-semibold">{userInfo.username}</p>
                            <p className="text-xs">{userInfo.email}</p>
                        </div>
                    </NavbarItem>

                    <NavbarItem className="hidden  flex-col justify-start gap-2">
                        {/* 
                        //  Todo: apply theme switcher and logout button as side bar items that will be triggered by avatar
                        */}
                        <ThemeSwitcher />
                        <Link href="/">
                            <Chip
                                variant="solid"
                                size="sm"
                                classNames={{
                                    base: "bg-orange-700",
                                    content: "drop-shadow shadow-black text-white",
                                }}
                                className="cursor-pointer"
                            >
                                Logout
                            </Chip>
                        </Link>
                    </NavbarItem>
                </NavbarContent>


                <NavbarMenu className="mt-6 w-full">
                    {userNavigation.map((links) => {
                        const isActive = pathname === links.route
                        return (
                            <NavbarMenuItem key={links.label}>
                                <Link
                                    color="foreground"
                                    className={`${isActive && "text-[#FB542B] text-2xl font-bold"} text-medium w-full`}
                                    href={links.route}
                                    size="lg"
                                >
                                    {links.label}
                                </Link>
                            </NavbarMenuItem>
                        )
                    })}
                </NavbarMenu>
            </Navbar>
        </>
    )
}