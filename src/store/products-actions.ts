import { AnyAction, ThunkAction, Dispatch } from "@reduxjs/toolkit";

import { productsSlice } from "./products-slice";
import productsData from "../data/products.json";
import { RootState } from ".";

export const productsActions = productsSlice.actions;

export const fetchProducts =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: Dispatch, getState: any) => {
    if (!getState().products?.length) {
      const remapedProducts = productsData.map(
        ({ id, name, unit_price_incl_vat, vat_category, stock_quantity }) => ({
          id,
          name,
          unitPrice: unit_price_incl_vat,
          vat: vat_category,
          stock: stock_quantity,
        })
      );

      dispatch(productsActions.setProducts(remapedProducts));
    }
  };
