"use client"
import {configureStore} from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import { socketReducer } from "./features/auth/socketUser";

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        messages: socketReducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

const initializeApp = async () => {
    await store.dispatch(apiSlice.endpoints.loaduser.initiate({}, {forceRefetch: true}));

}
initializeApp();