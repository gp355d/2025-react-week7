import { createSlice } from '@reduxjs/toolkit';
export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
  },
  reducers: {
    removeMessage(state, action) {
      const messageId = action.payload;
      const idx = state.messages.findIndex(
        (message) => message.id === messageId
      );
      if (idx !== -1) {
        state.messages.splice(idx, 1);
      }
    },
    pushMessage(state, action) {
      const { text, status } = action.payload;
      const id = Date.now();
      state.messages.push({
        id,
        text,
        status,
      });
    },
  }
})
export const messages = (state) => state.message.messages;

export const { pushMessage,removeMessage } = messageSlice.actions;
export default  messageSlice.reducer;