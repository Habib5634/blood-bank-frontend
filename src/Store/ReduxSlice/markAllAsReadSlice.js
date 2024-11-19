import { createSlice } from "@reduxjs/toolkit";
import { markAllAsRead } from "../Actions/userAction";

const markAllAsReadSlice = createSlice({
    name: 'markAllAsRead',
    initialState: {
      notifications: null,
      markStatus: 'idle',
      markReadStatus:false,
      error: null,
    },
    reducers: {
      // Define other reducers if needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(markAllAsRead.pending, (state) => {
          state.markStatus = 'loading';
        })
        .addCase(markAllAsRead.fulfilled, (state, action) => {
          state.markStatus = 'succeeded';
          state.notifications = action.payload
          // Update notifications or set success state
        })
        .addCase(markAllAsRead.rejected, (state, action) => {
          state.markStatus = 'failed';
          state.error = action.payload;
        });
    },
  });
  
  // Export the reducer to include in the store
  export default markAllAsReadSlice.reducer;