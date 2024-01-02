import { apiSlice } from "../api/apiSlice";

export const videoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        videoGeneration: builder.mutation({
            query: (prompt) => ({
                url: "video/video-generation",
                method: "POST",
                body: {
                    prompt
                },
                credentials: "include" as const
            })
        }),
        getAllVideo: builder.query({
            query: () => ({
                url: "video/getAllvideo",
                method: "GET",
                credentials: "include" as const
            })
        })
    })
})

export const {useGetAllVideoQuery, useVideoGenerationMutation} = videoApi