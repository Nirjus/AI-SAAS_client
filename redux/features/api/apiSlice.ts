import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_SERVER_URI,
    }),
    endpoints: (builder) => ({
        loaduser: builder.query({
            query: () => ({
                url: "user/me",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            token: result.data.accesskey,
                            user: result.data.user,
                        })
                    );
                } catch (error: any) {
                    console.log(error)
                }
            }
        })
    })
});

export const {useLoaduserQuery} = apiSlice;