
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SwitchToggle from "./SwitchToggle"

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

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

    if (!mounted) return null

    return (
        <div className="flex flex-col gap-3 justify-center items-center">
            <SwitchToggle theme={theme} onChange={handleToggleSwitch} />
        </div>
    )
};