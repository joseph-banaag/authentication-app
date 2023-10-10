import { Button } from "@nextui-org/react"
import React from 'react'

const DisabledButton = () => {
  return (
    <Button
      type="submit"
      isDisabled
      name="submit"
      className="bg-green-800 hover:bg-green-900 drop-shadow-lg transition-all duration-300"
    >
      <p className="text-white font-semibold flex-1">Continue</p>
    </Button >
  )
}

export default DisabledButton