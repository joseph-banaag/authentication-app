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



export default function Topbar() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        {
            route: "/",
            label: "Home",
        },
        {
            route: "/sign-in",
            label: "Sign-In",
        },
        {
            route: "/sign-up",
            label: "Sign-Up",
        },

    ];
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll className="flex flex-wrap mb-24">
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
                        <p className="font-bold text-inherit nav_name cursor-pointer">Authentication</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="secondary" href="/sign-up" variant="flat" className="hidden lg:flex">
                        Sign Up
                    </Button>
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
                                className={`${isActive && "text-secondary text-2xl font-bold"} w-full`}
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

