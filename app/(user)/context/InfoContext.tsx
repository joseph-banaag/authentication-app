"use client"
import { createContext } from "react";

interface UserContextType {
    use_username: string
    use_email: string
    image: string
}

export const username_fromInput = (user_name: string) => {
    console.log(user_name)
    return (
        <></>
    )
}

const UserContext = createContext<UserContextType | any>("")

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    // TODO: get the value of the username and email from the database
    const username = "joshua_23"
    const email = "josephrbanaag51@gmail.com"
    const image = "https://i.pinimg.com/280x280_RS/8e/dd/1e/8edd1e070a3382921de5829e58923704.jpg"

    const use_username = username
    const use_email = email
    const use_image = image

    console.log(use_username)
    console.log(use_email)

    return (
        <UserContext.Provider value={{
            use_username,
            use_email,
            use_image
        }}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContext;