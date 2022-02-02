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
  cartItemsQty: number;
}

const initialState: CartState = {
  data: [],
  status: 'idle',
  error: null,
  cartItemsQty: 0,
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

export const removeProductCartApi = createAsyncThunk(
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
      state.cartItemsQty = 0;
    },
    removeProductCart(state, action) {
      state.data = state.data.filter(
        item => item.producto.id !== action.payload,
      );
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
        state.cartItemsQty = state.data.reduce((total, item) => {
          return (total += item.quantity);
        }, 0);
      })
      .addCase(fetchProductsCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(removeProductCartApi.fulfilled, (state, action) => {
        state.data = action.payload;
        state.cartItemsQty = state.data.reduce((total, item) => {
          return (total += item.quantity);
        }, 0);
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
        state.cartItemsQty = action.payload.reduce(
          (total: number, item: IItemCarrito) => {
            return (total += item.quantity);
          },
          0,
        );
      })
      .addCase(editProductInCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.cartItemsQty = state.data.reduce((total, item) => {
          return (total += item.quantity);
        }, 0);
      });
  },
});

export const { emptyCart, removeProductCart } = cartSlice.actions;

export default cartSlice.reducer;
