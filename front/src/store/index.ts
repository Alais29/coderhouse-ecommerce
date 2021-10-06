import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "features/products/productsSlice";
import cartReducer from "features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {products: ProductsState }
export type AppDispatch = typeof store.dispatch;
