import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder } from 'commons/interfaces';
import { getOrders, saveOrder } from 'services/Orders';

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

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (): Promise<IOrder[]> => {
    const response = await getOrders();
    return response;
  },
);

export const createOrder = createAsyncThunk('order/createOrder', async () => {
  const response = await saveOrder();
  return response;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    emptyOrders(state) {
      state.data = [];
      state.lastOrder = null;
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;

        const notCompletedOrders = action.payload.filter(
          item => item.estado === 'generada',
        );

        const lastNotCompletedOrder =
          notCompletedOrders[notCompletedOrders.length - 1];
        if (lastNotCompletedOrder) {
          state.lastOrder = lastNotCompletedOrder;
        }
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.lastOrder = action.payload;
      });
  },
});

export const { emptyOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
