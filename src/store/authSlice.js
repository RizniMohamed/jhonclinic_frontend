import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
}

const authSlice = createSlice({
    name: "Auth Slice",
    initialState,
    reducers: {
        set: (state, payload) => {
            state.status = true
        },
        reset: (state, payload) => {
            state.status = false
        }
    }
})

export const authActions = authSlice.actions
export default authSlice