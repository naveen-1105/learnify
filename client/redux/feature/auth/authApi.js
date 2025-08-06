import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegisteration } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegisteration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.log("Registration failed:", error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activationToken, activationCode }) => ({
        url: "activate-user",
        method: "POST",
        body: { activationCode },
        headers: {
          Authorization: `Bearer ${activationToken}`,
        },
      }),
    }),
    login: builder.mutation({
        query:({email,password}) => ({
            url: "login",
            method: "POST",
            body: {
                email,
                password
            },
            credentials: "include"
        }),
        async onQueryStarted(arg, {queryFulfilled,dispatch}){
            try {
                const result = await queryFulfilled;
                dispatch(
                    userLoggedIn({
                        accessToken: result.data.activationToken,
                        user: result.data.user,
                    })
                );
            } catch(error){
                console.log(error);
            }
        }
    }),
    socialAuth: builder.mutation({
        query:({email,name,avatar}) => ({
            url: "social-auth",
            method: "POST",
            body: {
                email,
                name,
                avatar
            },
            credentials: "include"
        }),
        async onQueryStarted(arg, {queryFulfilled,dispatch}){
            try {
                const result = await queryFulfilled;
                dispatch(
                    userLoggedIn({
                        accessToken: result.data.activationToken,
                        user: result.data.user,
                    })
                );
            } catch(error){
                console.log(error);
            }
        }
    })
  }),
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation} = authApi;
