"use client"
import { createContext, useContext, useState } from 'react';

interface ModalContextType {
  displayOn: boolean,
  setDisplayOn: (displayOn: boolean) => void,
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)


const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ displayOn, setDisplayOn ] = useState<boolean>(false)

  return (
    <>
      <ModalContext.Provider value={{
        displayOn, setDisplayOn
      }}>
        {children}
      </ModalContext.Provider>
    </>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModalContext should be use within the ModalContextProvider. Add the Provided to your Route Layout.")
  }
  return context;
}

export default ModalContextProvider