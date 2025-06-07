import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticate: false,
    initialized: false,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login (state, action) {
            state.authenticate = true;
            state.initialized = true;
            state.user = action.payload;
        },
        logout (state) {
            state.authenticate = false;
            state.initialized = true;
            state.user = null;
        },
        updateUsername (state, action) {
            state.user = {...state.user, username:action.payload};
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;