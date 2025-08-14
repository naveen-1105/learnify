import { apiSlice } from "../api/apiSlice";
// import Cookies from "js-cookie"

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-profile",
        method: "PUT",
        body: { avatar },
        credentials: "include",
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword,newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: { oldPassword,newPassword },
        credentials: "include",
      }),
    }),
    updateInfo: builder.mutation({
      query: (name) => ({
        url: "update-user-info",
        method: "PUT",
        body: {name},
        credentials: "include",
      }),
    }),
  }),
});

export const { useUpdateAvatarMutation, useUpdatePasswordMutation,useUpdateInfoMutation } = userApi;
