"use client"
import React, { use } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/react";
import { usePathname } from 'next/navigation'
import { menuItems } from "../../constants"
import ComponentChanger from "@/components/lib/ComponentChanger";
import { ThemeSwitcher } from "@/components/toggle/ThemeSwitcher";



export default function Topbar() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll className="flex flex-wrap p-3">
            <NavbarContent justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand className="flex flex-1">
                    <Link
                        href="/"
                    >
                        <p className="lg:text-2xl md:text-xl sm:text-lg font-bold text-foreground nav_name cursor-pointer sm:flex hidden drop-shadow-lg">Authentication</p>
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

            <NavbarMenu className="mt-6 w-full">
                {menuItems.map((links) => {
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
    );
}

