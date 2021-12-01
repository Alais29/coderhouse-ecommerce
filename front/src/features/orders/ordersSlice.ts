import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder } from 'commons/interfaces';
import { saveOrder } from 'services/Orders';

interface OrderState {
  data: IOrder[];
  lastOrder: IOrder | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: OrderState = {
  data: [],
  lastOrder: null,
  status: 'idle',
  error: null,
};

export const createOrder = createAsyncThunk('order/createOrder', async () => {
  const response = await saveOrder();
  return response;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.lastOrder = action.payload;
    });
  },
});

export default ordersSlice.reducer;
