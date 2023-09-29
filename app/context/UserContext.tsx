"use client"
import { createContext, useContext, useState } from 'react';

interface DataContextType {
    username: string,
    setUsername: (username: string) => void,
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [username, setUsername] = useState<string>("")

        console.log(username)

    return (
        <DataContext.Provider value={{
            username, setUsername
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const UseData = () => {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error("UseData must be used within the DataProvider")
    }
    return context
}

