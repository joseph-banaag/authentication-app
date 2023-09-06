
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SwitchToggle from "./SwitchToggle"

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    console.log(theme)

    const handleToggleSwitch = (clicked: boolean) => {
        if (clicked) {
            console.log("the button is clicked for light mode")
            setTheme("light")
        } else {
            console.log("the button is clicked for dark mode")
            setTheme("dark")

        }
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="flex justify-center items-center">
            <SwitchToggle onChange={handleToggleSwitch} />
        </div>
    )
};