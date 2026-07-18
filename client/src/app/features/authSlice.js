import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");

const authSlice = createSlice({
    name: "auth",

    initialState: {
        token: savedToken || null,
        user: null,
        loading: Boolean(savedToken),
    },

    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.loading = false;
        },

        logout: (state) => {
            state.token = null;
            state.user = null;
            state.loading = false;

            localStorage.removeItem("token");
        },

        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const {
    login,
    logout,
    setUser,
    setLoading,
} = authSlice.actions;

export default authSlice.reducer;