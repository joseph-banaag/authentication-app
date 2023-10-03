
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SwitchToggle from "./SwitchToggle"


export function ThemeSwitcher() {
    const [ mounted, setMounted ] = useState(false)
    const { theme, setTheme } = useTheme()

    const handleToggleSwitch = (clicked: boolean) => {
        if (clicked) {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }

    useEffect(() => {
        setMounted(true)
    }, [ mounted ])

    return (
        <div className="flex justify-start items-center">
            <SwitchToggle onChange={handleToggleSwitch} />
        </div>
    )
};