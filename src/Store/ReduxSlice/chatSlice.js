import {  createSlice } from "@reduxjs/toolkit";
import { fetchConversations, fetchMessages } from "../Actions/userAction";



const chatSlice = createSlice({
    name: 'chat',
    initialState: {
      conversations: [],
      selectedConversationId: null,
      messages: [],
      status: 'idle',
    },
    reducers: {
      setSelectedConversation(state, action) {
        state.selectedConversationId = action.payload;
        state.messages = []; // Clear messages when a new conversation is selected
  
        // Find the selected conversation
        const selectedConversation = state.conversations.find(
          (conversation) => conversation._id === action.payload
        );
  
        // Set participant1Id and participant2Id based on participants array
        if (selectedConversation && selectedConversation.participants.length >= 2) {
          state.participant1Id = selectedConversation.participants[0]._id;
          state.participant2Id = selectedConversation.participants[1]._id;
        } else {
          // Reset if no participants or invalid conversation
          state.participant1Id = null;
          state.participant2Id = null;
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchConversations.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchConversations.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.conversations = action.payload;
        })
        .addCase(fetchConversations.rejected, (state) => {
          state.status = 'failed';
        })
        .addCase(fetchMessages.fulfilled, (state, action) => {
          state.messages = action.payload;
        });
    },
  });
  
  export const { setSelectedConversation } = chatSlice.actions;
  export default chatSlice.reducer;