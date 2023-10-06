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


  const currentTheme = `${theme}`

  const toggleButton = () => {
    setClicked(!clicked)
    localStorage.setItem("theme", currentTheme)
  };

  const handleThemeToLight = () => {
    setTheme("light")
  }

  const handleThemeToDark = () => {
    setTheme("dark")
  }

  const storedTheme = {
    data: typeof window !== "undefined"
      ? localStorage.getItem("theme")
      : ""
  }

  const storedThemeValue = storedTheme.data
  console.log(storedThemeValue)

  return (
    <>
      <div
        onClick={toggleButton}
        className={`relative sm:w-11 sm:h-5 w-9 h-4 p-0 flex items-center cursor-pointer rounded-2xl bg-violet-900 ms-2.5 !ps-[-5px] 
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
            ? <div
              onClick={handleThemeToLight}
              className="slider sm:w-9 sm:h-6 w-7 h-5 absolute sm:left-[-20px] left-[-15px] flex justify-center items-center rounded-sm truncate !text-white text-sm capitalize bg-violet-500 rounded-l-md ">
              <small>{client
                ? theme
                : ""}</small>
            </div>
            : <div
              onClick={handleThemeToDark}
              className="slider sm:w-9 sm:h-6 w-7 h-5 absolute sm:left-[-20px] left-[-15px] flex justify-center items-center rounded-sm truncate !text-white text-sm capitalize bg-violet-900 rounded-r-md ">
              <small>{client
                ? theme
                : ""}</small>
            </div>
          : null
        }
      </div>
    </>
  )
}

export default ThemeSwitcher