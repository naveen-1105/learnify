import { createSlice } from "@reduxjs/toolkit";
import { react } from "react";

const initialState = {
    token: "",
    user: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegisteration: (state, action) => {
            state.token = action.payload.token;
        },
        userLoggedIn: (state, action) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.token = "";
            state.user = "";
        },
    },
})

export const { userRegisteration, userLoggedIn, userLoggedOut } = authSlice.actions; 