import { createSlice } from "@reduxjs/toolkit";
import { markRead } from "../Actions/userAction";

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
      notifications: [],
      status: 'idle',
      error: null,
    },
    reducers: {
      // Define other reducers if needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(markRead.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(markRead.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Update notifications or set success state
        })
        .addCase(markRead.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });
  
  // Export the reducer to include in the store
  export default notificationsSlice.reducer;