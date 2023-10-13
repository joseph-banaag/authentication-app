import React from 'react'
import { MoonIcon } from "@/components/utils/icons/MoonIcon"

const ToggleDarkStyle = () => {
  return (
    <>
      <div className="sm:w-11 sm:h-5 w-9 h-4 rounded-full bg-violet-900 flex items-center sm:pe-2 pe-[5px] flex-row-reverse">
        <MoonIcon className="!text-white"/>
      </div>
    </>
  )
}

export default ToggleDarkStyle