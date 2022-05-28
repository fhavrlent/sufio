import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product, Products } from "../types";

const initProductsState: Products = [];

export const productsSlice = createSlice({
  name: "products",
  initialState: initProductsState,
  reducers: {
    setProducts: (state, action: PayloadAction<Products>) => {
      state.push(...action.payload);
    },
  },
});
