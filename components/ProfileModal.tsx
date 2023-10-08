import { Avatar } from "@nextui-org/react"
import React from 'react'

const ProfileModal = () => {
  const image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

  return (
    <>
      <div className="absolute top-16 right-20 border w-[420px] h-auto p-3">
        <h1>
          This will display the profile modal
        </h1>
        <Avatar
          showFallback
          radius="full"
          isFocusable
          src={image}
          className="cursor-pointer sm:w-9 w-7 sm:h-9 h-7"
        />
      </div>
    </>
  )
}

export default ProfileModal

{/*

<Avatar
        showFallback
        radius="full"
        isFocusable
        src={image}
        className="cursor-pointer sm:w-9 w-7 sm:h-9 h-7"
      />

*/}