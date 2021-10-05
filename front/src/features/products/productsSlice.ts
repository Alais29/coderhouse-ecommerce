import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IItem } from "commons/interfaces";
import { getProducts } from "services/Productos";

interface ProductsState {
  data: IItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: ProductsState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await getProducts();
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded(state, action: PayloadAction<IItem>) {
      state.data.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.data = state.data.concat(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = productsSlice.actions;

export const { productAdded } = productsSlice.actions;

export default productsSlice.reducer;
