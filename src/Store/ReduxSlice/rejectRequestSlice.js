import { createSlice } from "@reduxjs/toolkit";
import { rejectRequest } from "../Actions/userAction";

const rejectRequestSlice = createSlice({
    name: 'rejectRequest',
    initialState: {
      rejectRequest: [],
      rejectStatus: 'idle',
      rejectError: null,
    },
    reducers: {
      // Define other reducers if needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(rejectRequest.pending, (state) => {
          state.rejectStatus = 'loading';
        })
        .addCase(rejectRequest.fulfilled, (state, action) => {
          state.rejectStatus = 'succeeded';
          // Update notifications or set success state
        })
        .addCase(rejectRequest.rejected, (state, action) => {
          state.rejectStatus = 'failed';
          state.rejectError = action.payload;
        });
    },
  });
  
  // Export the reducer to include in the store
  export default rejectRequestSlice.reducer;