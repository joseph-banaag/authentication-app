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

  console.log(clicked)

  const toggleButton = () => {
    setClicked(!clicked)
  };

  const ToggleLightStyle = () => {
    return (
      <>
        <div className="w-11 h-5 rounded-full bg-violet-400 flex items-center ps-[2px]">
          <SunIcon />
        </div>
      </>
    )
  }

  const ToggleDarkStyle = () => {
    return (
      <>
        <div className="w-11 h-5 rounded-full bg-violet-900 flex items-center pe-[2px] flex-row-reverse">
          <MoonIcon />
        </div>
      </>
    )
  }

  return (
    <>
      <div
        onClick={toggleButton}
        className={`relative w-11 h-5 p-0 flex items-center cursor-pointer rounded-2xl bg-violet-900 ms-2.5 !ps-[-5px] 
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
          slider w-8 h-6 absolute left-[-16px] flex justify-center items-center
          ${clicked
              ? "bg-violet-900"
              : "bg-violet-400"
            } 
            rounded-sm truncate`
          }
        >
          <small>{client
            ? <p
              className="dark:text-zinc-900 light:text-zinc-200 font-light text-xs "
            >{theme}</p>
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