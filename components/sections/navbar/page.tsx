"use client"
import React, { use } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Link,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    linkAnchorClasses
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/components/toggle/ThemeSwitcher"
import { usePathname } from 'next/navigation'
import { menuItems } from "../../constants"
import ComponentChanger from "@/components/lib/ComponentChanger";



export default function Topbar() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll className="flex flex-wrap">
            <NavbarContent justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand className="flex flex-1">
                    <Link
                        href="/"
                        color="foreground"
                    >
                        <p className="font-bold text-inherit nav_name cursor-pointer sm:flex hidden">Authentication</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <ComponentChanger />
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="w-full">
                {menuItems.map((links) => {
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
    );
}

