"use client"

import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/react";
import { userNavigation } from "@/app/(user)/userComponents/constants/index"
import { usePathname } from 'next/navigation'
import { ThemeSwitcher } from "@/components/toggle/ThemeSwitcher";


export default function Topbar() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <>
            <Navbar onMenuOpenChange={setIsMenuOpen} className="absolute top-0" shouldHideOnScroll>
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
                            <p className="font-bold text-inherit nav_name cursor-pointer sm:flex hidden">Authentication</p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent justify="end" className="gap-5 sm:flex hidden">
                    <NavbarItem>
                        <Link color="foreground" href="/dashboard/profile">
                            Profile
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/dashboard/settings">
                            Settings
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/dashboard/security">
                            Security
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarItem>
                    user avatar
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>

                <NavbarMenu>
                    {userNavigation.map((links) => {
                        const isActive = pathname === links.route
                        return (
                            <NavbarMenuItem key={links.label}>
                                <Link
                                    color="foreground"
                                    className={`${isActive && "text-secondary text-2xl font-bold"} text-medium w-full`}
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