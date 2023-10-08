import { useTheme } from "next-themes"
import React, { useEffect, useState } from 'react'
import ToggleLightStyle from "@/components/toggle/ToggleLightStyle"
import ToggleDarkStyle from "@/components/toggle/ToggleDarkStyle"

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [ client, setClient ] = useState<boolean>(false)
  const [ clicked, setClicked ] = useState<boolean>(false)

  useEffect(() => {
    setClient(true)
  }, [])


  const toggleButton = () => {
    setClicked(!clicked)
    location.reload()
  };

  const handleThemeToLight = () => {
    setTheme("light")
    localStorage.setItem("theme", "light")
  }

  const handleThemeToDark = () => {
    setTheme("dark")
    localStorage.setItem("theme", "dark")
  }

  const storedTheme = {
    data: typeof window !== "undefined"
      ? localStorage.getItem("theme")
      : ""
  }

  const storedThemeValue = storedTheme.data

  return (
    <>
      <div
        onClick={toggleButton}
        className={`relative sm:w-11 sm:h-5 w-9 h-4 p-0 flex items-center cursor-default rounded-2xl bg-violet-900 ms-2.5 !ps-[-5px] 
        ${client
            ? theme === "light" || !theme
              ? "active"
              : ""
            : ""
          }
        `}
      >
        {client
          ? theme === "light" || !theme
            ? <ToggleLightStyle />
            : <ToggleDarkStyle />
          : ""
        }
        {client
          ? storedThemeValue === "dark" || !storedThemeValue
            ? <button
              type="button"
              onClick={handleThemeToLight}
              className="slider sm:w-9 sm:h-6 w-7 h-5 absolute sm:left-[-20px] left-[-15px] flex justify-center items-center rounded-sm truncate !text-white text-sm capitalize bg-violet-500 rounded-l-md p-[2px] shadow-lg">
              <p className="sm:text-[12px] text-[10px] sm:font-normal font-small drop-shadow-md">{client
                ? theme
                : ""}</p>
            </button>
            : <button
              type="button"
              onClick={handleThemeToDark}
              className="slider sm:w-9 sm:h-6 w-7 h-5 absolute sm:left-[-20px] left-[-15px] flex justify-center items-center rounded-sm truncate !text-white text-sm capitalize bg-violet-900 rounded-r-md p-[2px] shadow-lg">
              <p className="sm:text-[12px] text-[10px] sm:font-normal font-small drop-shadow-md">{client
                ? theme
                : ""}</p>
            </button>
          : null
        }
      </div>
    </>
  )
}

export default ThemeSwitcher