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
  };

  const handleThemeToLight = () => {
    setTheme("light")
    console.log("The button is clicked!")
  }

  const handleThemeToDark = () => {
    setTheme("dark")
    console.log("The button is clicked!")
  }

  // 
  // 

  return (
    <>
      <div
        onClick={toggleButton}
        className={`relative sm:w-11 sm:h-5 w-9 h-4 p-0 flex items-center cursor-pointer rounded-2xl bg-violet-900 ms-2.5 !ps-[-5px] 
        ${clicked
            ? "active"
            : ""
          }
        `}
      >
        {clicked
          ? <ToggleLightStyle />
          : <ToggleDarkStyle />
        }


        {/* 
        // TODO: DEFAULT POSITION: LEFT
          current theme: dark
          switch below: to light
        */}
        <div
          onClick={handleThemeToLight}
          className="slider sm:w-9 sm:h-6 w-7 h-5 absolute sm:left-[-20px] left-[-15px] flex justify-center items-center rounded-sm truncate !text-white text-sm capitalize bg-violet-900 rounded-r-md ">
          <small>{client
            ? theme
            : ""}</small>
        </div>

        {/* 
        // TODO: DEFAULT POSITION: RIGHT
        */}
        <div
          onClick={handleThemeToDark}
          className="slider sm:w-9 sm:h-6 w-7 h-5 absolute sm:left-[-20px] left-[-15px] flex justify-center items-center rounded-sm truncate !text-white text-sm capitalize bg-violet-500 rounded-l-md ">
          <small>{client
            ? theme
            : ""}</small>
        </div>

      </div>
    </>
  )
}

export default ThemeSwitcher