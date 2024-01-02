import { apiSlice } from "../api/apiSlice";

export const codeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        codeCreation: builder.mutation({
            query: (prompt) => ({
                url: "code/code-generation",
                method: "POST",
               body:{
                prompt
               },
               credentials: "include" as const,
            })
        }),
         getAllcodes: builder.query({
            query: () => ({
                url: "code/getAllCode",
                method: "GET",
                credentials: "include" as const
            })
         }),
    })
})

export const {useCodeCreationMutation, useGetAllcodesQuery} = codeApi