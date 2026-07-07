import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice.js";
import cartReducer from "../features/cartSlice.js";
import wishlistReducer from "../features/wishlistSlice.js";
import authReducer from "../features/authSlice.js";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
