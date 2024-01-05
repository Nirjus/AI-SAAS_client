import { apiSlice } from "../api/apiSlice";

export const subscriptionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCheckout: builder.query({
            query: () => ({
                url: `subscription/stripeCheckout`,
                method: "GET",
               credentials: "include" as const,
            })
        }),
        checkSubscription: builder.query({
            query: () => ({
                url: "subscription/check",
                method: "GET",
                credentials: "include" as const
            })
        }),
    })
})

export const {  useCreateCheckoutQuery, useCheckSubscriptionQuery } = subscriptionApi