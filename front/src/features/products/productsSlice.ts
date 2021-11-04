import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IItem, IItemAPI, IItemQuery } from 'commons/interfaces';
import {
  deleteProduct,
  getProducts,
  saveProduct,
  updateProduct,
} from 'services/Productos';

interface ProductsState {
  data: IItemAPI[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: ProductsState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (query?: IItemQuery) => {
    const response = await getProducts(query);
    return response;
  },
);

export const addNewProduct = createAsyncThunk(
  'products/addNewProduct',
  // The payload creator receives the partial product object
  async (product: IItem) => {
    // We send the initial data to the server
    const response = await saveProduct(product);
    // The response includes the complete post object, including unique ID
    return response;
  },
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (productData: { id: string; product: IItemAPI }) => {
    const { id, product } = productData;
    const response = await updateProduct(id, product);
    return response;
  },
);

export const removeProductApi = createAsyncThunk(
  'products/removeProduct',
  async (productId: string) => {
    const response = await deleteProduct(productId);
    return response;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    removeProduct: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched products to the array
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        // We can directly add the new product object to our products array
        state.data.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const productToUpdateIndex = state.data
          .map((item: IItemAPI) => item.id)
          .indexOf(action.payload.id);
        state.data.splice(productToUpdateIndex, 1, action.payload);
      });
  },
});

// Action creators are generated for each case reducer function
export const { removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
