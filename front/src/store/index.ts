import { configureStore } from '@reduxjs/toolkit';
import productsReducer from 'features/products/productsSlice';
import cartReducer from 'features/cart/cartSlice';
import userReducer from 'features/user/userSlice';
import messagesReducer from 'features/messages/messagesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    messages: messagesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {products: ProductsState }
export type AppDispatch = typeof store.dispatch;
