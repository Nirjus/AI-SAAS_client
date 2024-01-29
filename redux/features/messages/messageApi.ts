import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMessage: builder.mutation({
            query: ({id, role, content}) => ({
                url: "messages/create",
                method: "POST",
                body:{
                   id, role, content
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