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
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include",
      }),
    }),
    updateInfo: builder.mutation({
      query: (name) => ({
        url: "update-user-info",
        method: "PUT",
        body: { name },
        credentials: "include",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "get-all-users",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({email}) => ({
        url:"promote-admin",
        method: "POST",
        body: {email},
        credentials: "include"
      })
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include"
      })
    })
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdatePasswordMutation,
  useUpdateInfoMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  
} = userApi;
