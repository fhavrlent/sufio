import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Cart, Product, Products } from "../types";

const initProductsState: Products = [];

export const productsSlice = createSlice({
  name: "products",
  initialState: initProductsState,
  reducers: {
    setProducts: (state, action: PayloadAction<Products>) => {
      state.push(...action.payload);
    },
    substractStock: (state, action: PayloadAction<Cart>) => {
      const newStock = state.map((product) => {
        const productInCart = action.payload.items.find(
          (item) => item.product.id === product.id
        );
        if (productInCart) {
          product.stock -= productInCart.quantity;
        }
        return product;
      });
    },
  },
});

export const { substractStock, setProducts } = productsSlice.actions;
