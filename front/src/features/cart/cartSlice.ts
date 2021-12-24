import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IItemCarrito } from 'commons/interfaces';
import {
  getCarritoProducts,
  saveCarritoProduct,
  editCarritoProduct,
  deleteCarritoProduct,
} from 'services/Carrito';

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

export const editProductInCart = createAsyncThunk(
  'cart/editProductInCart',
  async (productData: { productId: string; amount: string | number }) => {
    const response = await editCarritoProduct(productData);
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

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    emptyCart(state) {
      state.data = [];
      state.status = 'idle';
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
        state.error = null;
      })
      .addCase(fetchProductsCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeProductCart.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        if (state.data.length !== 0 || state.status === 'succeeded') {
          const productIndex = state.data.findIndex(
            item => item.producto.id === action.payload.producto.id,
          );
          if (productIndex === -1) {
            state.data = state.data.concat(action.payload);
          } else {
            state.data[productIndex].quantity = action.payload.quantity;
          }
        }
      })
      .addCase(editProductInCart.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
