import { createSlice } from '@reduxjs/toolkit';
import { IMessage } from 'commons/interfaces';

interface MessagesState {
  data: IMessage[];
}

const initialState: MessagesState = {
  data: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.data = action.payload;
    },
    addMessage: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
