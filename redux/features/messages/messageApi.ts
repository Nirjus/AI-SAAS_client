import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMessage: builder.mutation({
            query: ({from, to, content}) => ({
                url: "messages/create",
                method: "POST",
                body:{
                  from, to, content
                },
                credentials: "include" as const
            })
        }),
        getMessage: builder.query({
            query: (id) => ({
                url: `messages/getmsg`,
                method: "GET",
                params: {id},
                credentials: "include" as const
            })
        }),
    })
})

export const {useCreateMessageMutation, useGetMessageQuery} = messageApi