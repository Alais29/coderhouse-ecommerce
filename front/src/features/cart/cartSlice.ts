import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IItemCarrito } from 'commons/interfaces';
import {
  getCarritoProducts,
  saveCarritoProduct,
  deleteCarritoProduct,
} from 'services/Carrito';
import { sendOrder } from 'services/Orders';

interface CartState {
  data: IItemCarrito[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: CartState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchProductsCart = createAsyncThunk(
  'cart/fetchProductsCart',
  async () => {
    const response = await getCarritoProducts();
    return response;
  },
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async (productId: string) => {
    const response = await saveCarritoProduct(productId);
    return response;
  },
);

export const removeProductCart = createAsyncThunk(
  'cart/removeProductCart',
  async (productId: string) => {
    const response = await deleteCarritoProduct(productId);
    return response;
  },
);

export const sendCartOrder = createAsyncThunk(
  'cart/sendCartOrder',
  async () => {
    const response = await sendOrder();
    return response;
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    emptyCart(state) {
      state.data = [];
      state.status = 'idle';
      state.error = 'null';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsCart.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.concat(action.payload);
      })
      .addCase(fetchProductsCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeProductCart.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        const productIndex = state.data.findIndex(
          item => item.producto.id === action.payload.producto.id,
        );
        if (productIndex === -1) {
          state.data = state.data.concat(action.payload);
        } else {
          state.data[productIndex].quantity = action.payload.quantity;
        }
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(sendCartOrder.fulfilled, state => {
        state.data = [];
      });
  },
});

export const { emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
