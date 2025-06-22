import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

const testimonialSlice = createSlice({
    name: "testimonials",
    initialState,
    reducers: {
        setData (state, action) {
            state.data = action.payload;
        }
    }
})

export const testimonialActions = testimonialSlice.actions;
export default testimonialSlice.reducer;