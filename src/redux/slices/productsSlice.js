import { createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../api/productsApi";

const productsSlice = createSlice({
  name: "productsSlice",
  initialState: {
    products: {},
    product: null,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getAllProducts.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          products: payload.products,
        };
      }
    );
    builder.addMatcher(
      productsApi.endpoints.getProductById.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          product: payload.product,
        };
      }
    );
    builder.addMatcher(
      productsApi.endpoints.updateProduct.matchFulfilled,
      (state, { payload }) => {
        state.products = state.products.map((product) => {
          return product.id === payload.product.id
            ? { ...product, available: payload.product.available }
            : product;
        });
        return state;
      }
    );
  },
});

export default productsSlice.reducer;

