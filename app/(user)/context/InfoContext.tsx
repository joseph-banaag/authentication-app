"use client"
import { useContext, useState, useEffect, createContext } from "react";

interface UserContextType {
    use_username: string
    use_email: string
}

const UserContext = createContext<UserContextType | any >("")

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  
    const username = "joshua_23"
    const email = "josephrbanaag51@gmail.com"

    const use_username = username
    const use_email = email

    console.log(use_username)
    console.log(use_email)

    return (
        <UserContext.Provider value={{
            use_username,
            use_email
        }}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContext;