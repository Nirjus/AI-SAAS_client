import { apiSlice } from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createConversation: builder.mutation({
            query: (prompt) => ({
                url: "conversation/create-conversation",
                method: "POST",
               body:{
                prompt
               },
               credentials: "include" as const,
            })
        }),
         getAllConversation: builder.query({
            query: () => ({
                url: "conversation/getAllconversation",
                method: "GET",
                credentials: "include" as const
            })
         }),
    })
})

export const {useCreateConversationMutation, useGetAllConversationQuery} = conversationApi