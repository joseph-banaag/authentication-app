import { createContext, useState } from 'react';

interface CurrentUserContextType {
  username: string,
  setUsername: (username: string) => void,
  email: string,
  setEmail: (email: string) => void,
}

export const CurrentUserContext = createContext<CurrentUserContextType | null>(null)

const CurrentUser = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [ username, setUsername ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")

  return (
    <>
      <CurrentUserContext.Provider value={{
        username, setUsername,
        email, setEmail
      }}>
        {children}
      </CurrentUserContext.Provider>
    </>
  )
}

