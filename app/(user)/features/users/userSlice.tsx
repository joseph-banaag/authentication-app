import { createSlice } from '@reduxjs/toolkit'
import { RootState } from "@/app/(user)/redux/store"

interface UserState {
    username: string
    email: string
}

const initialState: UserState = {
    username: "",
    email: ""
}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    }
})

