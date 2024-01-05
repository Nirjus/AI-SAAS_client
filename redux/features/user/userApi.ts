import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query:({name, avatar, address, phoneNumber}) => ({
                url: "user/update-user",
                method: "PUT",
                body: {
                    name, avatar, address, phoneNumber
                },
                credentials: "include" as const,
            })
        }),
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: "user/forget-password",
                method: "POST",
                body:{
                    email
                },
                credentials: "include" as const
            })
        }),
        resetPassword: builder.mutation({
            query: ({token, resetPassword}) => ({
                url: "user/reset-password",
                method: "PUT",
                body: {
                    token, resetPassword
                },
                credentials: "include" as const
            })
        }),
        updatePassword: builder.mutation({
            query: ({oldPassword, newPassword, confirmPassword}) => ({
                url: "user/update-password",
                method: "PUT",
                body:{
                    oldPassword, newPassword, confirmPassword
                },
                credentials: "include" as const,
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `user/remove-account/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        getCreditCount: builder.query({
            query: () => ({
                url: "user/credit-count",
                method: "GET",
                credentials: "include" as const
            })
        }),
    })
})
export const {
  useUpdateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useDeleteUserMutation,
  useGetCreditCountQuery
} = userApi