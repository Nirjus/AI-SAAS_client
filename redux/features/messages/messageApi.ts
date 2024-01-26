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
        getMessage: builder.mutation({
            query: (id) => ({
                url: `messages/getmsg/${id}`,
                method: "POST",
                credentials: "include" as const
            })
        }),
    })
})

export const {useCreateMessageMutation, useGetMessageMutation} = messageApi