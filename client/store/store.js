import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './Auth/authSlice.js'
import ImageRudcer from './Shop/imageSlice.js'
export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        image: ImageRudcer
    }
})
