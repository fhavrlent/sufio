import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart-slice";
import { productsSlice } from "./products-slice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
