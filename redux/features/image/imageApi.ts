import { apiSlice } from "../api/apiSlice";

export const imageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        imageGeneration: builder.mutation({
            query: ({prompt, num}) => ({
                url: "image/image-generation",
                method: "POST",
                body: {
                    prompt,num
                },
                credentials: "include" as const
            })
        }),
        getAllImages: builder.query({
            query: () => ({
                url: "image/getAllImages",
                method: "GET",
                credentials: "include" as const
            })
        })
    })
})

export const {useImageGenerationMutation, useGetAllImagesQuery} = imageApi