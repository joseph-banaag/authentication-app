import { Button } from "@nextui-org/react"
import { useTheme } from "next-themes"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from 'react'
import { SunIcon } from "@/components/utils/icons/SunIcon"
import { MoonIcon } from "@/components/utils/icons/MoonIcon"

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

  const ToggleLightStyle = () => {
    return (
      <>
        <div className="sm:w-11 sm:h-5 w-9 h-4 rounded-full bg-violet-600 flex items-center sm:ps-2 ps-[5px]">
          <SunIcon />
        </div>
      </>
    )
  }

  const ToggleDarkStyle = () => {
    return (
      <>
        <div className="sm:w-11 sm:h-5 w-9 h-4 rounded-full bg-violet-900 flex items-center sm:pe-2 pe-[5px] flex-row-reverse">
          <MoonIcon />
        </div>
      </>
    )
  }

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
        <div
          className={`
          slider sm:w-9 sm:h-6 w-7 h-5 absolute sm:left-[-20px] left-[-15px] flex justify-center items-center rounded-sm truncate !text-white text-sm
          ${clicked
              ? ("bg-violet-900 rounded-r-md")
              : ("bg-violet-500 rounded-l-md")
            }          
          `}
        >
          <small>{client
            ? theme
            : ""}</small>
        </div>
      </div>
    </>
  )
}

export default ThemeSwitcher


{/*
Study useParams() function form next/navigation   
  * https://nextjs.org/docs/app/api-reference/functions/use-params
 
// TODO: TRY THIS TO SAVE THE STATE OF THE BUTTON WHEN THE BROWSER REFRESHED
  * Saving state to local storage
      localStorage.setItem('myState', JSON.stringify(this.state));

  * Retrieving state from local storage
    const savedState = JSON.parse(localStorage.getItem('myState'));
    this.setState(savedState);

*/}