import React from 'react'
import { SunIcon } from "@/components/utils/icons/SunIcon"

const ToggleLightStyle = () => {
  return (
    <>
      <div className="sm:w-11 sm:h-5 w-9 h-4 rounded-full bg-violet-600 flex items-center sm:ps-2 ps-[5px]">
        <SunIcon className="!text-white"/>
      </div>
    </>
  )
}

export default ToggleLightStyle