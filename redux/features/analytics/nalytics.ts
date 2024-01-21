import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
           generateCount: builder.query({
            query: () => ({
                url: "analytics/generationCount",
                method: "GET",
                credentials: "include" as const
            })
           }),
           mothlyGeneration: builder.query({
            query: () => ({
                url: "analytics/mothlyCount",
                method: "GET",
                credentials: "include" as const
            })
           }),
           userAnalytic: builder.query({
            query: () => ({
                url: "analytics/userAnalitic",
                method: "GET",
                credentials: "include" as const
            })
           }),
        mediaAnalytic: builder.query({
            query: () => ({
                url: "analytics/mediaAnalytic",
                method: "GET",
                credentials: "include" as const
            })
        })
    })
})

export const {useGenerateCountQuery, useMothlyGenerationQuery, useUserAnalyticQuery, useMediaAnalyticQuery} = analyticsApi