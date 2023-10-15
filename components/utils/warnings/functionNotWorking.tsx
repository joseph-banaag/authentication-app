import React from 'react'

export default function FuncNotWorking(): React.ReactNode {
  return (
    <>
          <p className="text-xs font-normal text-red-500">
              <span className="animate-pulse transition-all duration-300">
                  ⚠️
              </span>{" "}
              This option is not yet working.
          </p>
      </>
  )
}
