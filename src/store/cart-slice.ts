import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Cart, Product } from "../types";
import { calculateVat } from "../utils";

const initCartState: Cart = {
  items: [],
  vats: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initCartState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      const vatCategory = action.payload.vat;
      const existingVat = state.vats.find((vat) => vat.vat === vatCategory);
      if (existingVat && vatCategory !== 0) {
        existingVat.total += calculateVat(
          action.payload.unitPrice,
          action.payload.vat
        );
      } else if (vatCategory !== 0) {
        state.vats.push({
          vat: vatCategory,
          total: calculateVat(action.payload.unitPrice, action.payload.vat),
        });
      }
      if (itemInCart) {
        itemInCart.quantity += 1;
        state.total += action.payload.unitPrice;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
        state.total += action.payload.unitPrice;
      }
    },
    removeProductFromCart: (state, action: PayloadAction<Product>) => {
      const productToRemove = state.items.find(
        (product) => product.product.id === action.payload.id
      );
      if (productToRemove) {
        const vatCategory = action.payload.vat;
        const existingVat = state.vats.find((vat) => vat.vat === vatCategory);
        if (existingVat) {
          existingVat.total -=
            calculateVat(action.payload.unitPrice, action.payload.vat) *
            productToRemove.quantity;
        }
        state.items = state.items.filter(
          (product) => product.product.id !== action.payload.id
        );
        state.total -=
          productToRemove.product.unitPrice * productToRemove.quantity;
      } else {
        return;
      }
    },
    changeProductCartQuantity: (
      state,
      action: PayloadAction<Pick<Product, "id"> & { quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const productInCart = state.items.find(
        (product) => product.product.id === id
      );
      const vatCategory = productInCart?.product.vat;

      if (productInCart) {
        state.vats = state.vats.map((vat) => {
          if (vat.vat === vatCategory) {
            vat.total =
              calculateVat(
                productInCart?.product.unitPrice,
                productInCart?.product.vat
              ) * quantity;
          }
          return vat;
        });

        productInCart.quantity = quantity;
        const totalPrice = state.items.reduce(
          (acc, item) => acc + item.product.unitPrice * item.quantity,
          0
        );
        state.total = totalPrice;
      } else {
        return;
      }
    },
    clearCart: () => {
      return { ...initCartState };
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  changeProductCartQuantity,
  clearCart,
} = cartSlice.actions;
