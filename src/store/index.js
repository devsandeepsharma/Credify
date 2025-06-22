import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import testimonialSlice from "./testimonialSlice";

const store = configureStore({
    reducer: {
        "auth": authSlice,
        "testimonials": testimonialSlice
    }
})

export default store;