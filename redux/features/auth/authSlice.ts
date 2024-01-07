import {PayloadAction,createSlice} from "@reduxjs/toolkit"

const initialState = {
    token: "",
    user: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action: PayloadAction<{token: string}>) => {
            state.token = action.payload.token;
        },
        userLoggedIn: (state, action: PayloadAction<{accesskey: string, user: string}>) => {
            state.token = action.payload.accesskey,
            state.user = action.payload.user
        },
        userLoggedOut: (state) => {
            state.user = "",
            state.token = ""
        }
    }
})

export const {userRegistration, userLoggedIn, userLoggedOut} = authSlice.actions;

export default authSlice.reducer;