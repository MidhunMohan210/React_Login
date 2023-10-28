import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/autSlice'
import { apiSlice } from "./slices/apiSlice";
import adminAuthSlice from "./slices/adminAuthSlice";
const store=configureStore({
    reducer:{
        auth:authReducer,
        adminAuth:adminAuthSlice,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(apiSlice.middleware)

    },
    devTools:true
})

export default store;