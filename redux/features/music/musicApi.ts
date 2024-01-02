import { apiSlice } from "../api/apiSlice";

export const musicApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMusic: builder.mutation({
            query: (prompt) => ({
                url: "music/create-music",
                method: "POST",
               body:{
                prompt
               },
               credentials: "include" as const,
            })
        }),
        getAllmusic: builder.query({
            query: () => ({
                url: "music/getAllmusic",
                method:"GET",
                credentials: "include" as const
            })
        })
    })
})

export const {useCreateMusicMutation, useGetAllmusicQuery} = musicApi