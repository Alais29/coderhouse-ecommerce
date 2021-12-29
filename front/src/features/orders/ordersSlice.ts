import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder } from 'commons/interfaces';
import {
  getAllOrders,
  getOrders,
  saveOrder,
  completeOrder,
} from 'services/Orders';

interface OrderState {
  data: IOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
  allOrders: IOrder[];
  allOrdersStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  allOrdersError: string | null | undefined;
  lastOrder: IOrder | null;
}

const initialState: OrderState = {
  data: [],
  status: 'idle',
  error: null,
  allOrders: [],
  allOrdersStatus: 'idle',
  allOrdersError: null,
  lastOrder: null,
};

export const fetchOwnOrders = createAsyncThunk(
  'order/fetchOwnOrders',
  async (): Promise<IOrder[]> => {
    const response = await getOrders();
    return response;
  },
);

export const fetchAllOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async (): Promise<IOrder[]> => {
    const response = await getAllOrders();
    return response;
  },
);

export const createOrder = createAsyncThunk('order/createOrder', async () => {
  const response = await saveOrder();
  return response;
});

export const finishOrder = createAsyncThunk(
  'order/finishOrder',
  async (id: string) => {
    const response = await completeOrder(id);
    return response;
  },
);

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
      .addCase(fetchOwnOrders.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchOwnOrders.fulfilled, (state, action) => {
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
      .addCase(fetchOwnOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllOrders.pending, (state, action) => {
        state.allOrdersStatus = 'loading';
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.allOrdersStatus = 'failed';
        state.allOrdersError = action.error.message;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
        state.allOrdersError = null;
        state.allOrdersStatus = 'succeeded';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.lastOrder = action.payload;
      })
      .addCase(finishOrder.fulfilled, (state, action) => {
        const OrderToUpdateIndexAllOrders = state.allOrders
          .map((order: IOrder) => order.id)
          .indexOf(action.payload.id);
        const OrderToUpdateIndexData = state.data
          .map((order: IOrder) => order.id)
          .indexOf(action.payload.id);
        state.allOrders.splice(OrderToUpdateIndexAllOrders, 1, action.payload);
        state.data.splice(OrderToUpdateIndexData, 1, action.payload);
      });
  },
});

export const { emptyOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
