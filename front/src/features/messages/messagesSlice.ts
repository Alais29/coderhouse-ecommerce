import { createSlice } from '@reduxjs/toolkit';
import { IMessage } from 'commons/interfaces';

interface MessagesState {
  data: IMessage[];
  status: 'idle' | 'succeeded';
}

const initialState: MessagesState = {
  data: [],
  status: 'idle',
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.data = action.payload.data;
      state.status = action.payload.status || 'succeeded';
    },
    addMessage: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
