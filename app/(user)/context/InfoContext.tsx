"use client"
import { createContext, useContext, useState } from "react";

export interface UserContextType {
    username: string
    setUsername: (username: string) => void
    email: string
    setEmail: (email: string) => void
    image: string
    setImage: (image: string) => void

}
const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")

    // TODO: get the value of the username and email from the database
    // const username = "joshua_23"
    // const email = "josephrbanaag51@gmail.com"
    // const image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

    return (
        <UserContext.Provider value={{
            username, setUsername,
            email, setEmail,
            image, setImage
        }}>
            {children}
        </UserContext.Provider>
    )

}

export const UserData = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("UserData must be within a UserProvider")
    }
    return context
}

export default UserContext;