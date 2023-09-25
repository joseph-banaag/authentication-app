"use client"
import { createContext, useContext, useState } from 'react';

interface UserContextType {
    username: string,
    setUsername: (username: string) => void,
    email: string,
    setEmail: (email: string) => void,
    image: string,
    setImage: (image: string) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [image, setImage] = useState<string>("")

    console.log(username)
    console.log(email)
    console.log(image)

    return (
        <UserContext.Provider value={{
            username, setUsername,
            email, setEmail,
            image, setImage,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserDataContext = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("UserContext must be within the UserContextProvider")
    }
    return context
}