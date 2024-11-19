import { createSlice } from "@reduxjs/toolkit";
import { acceptRequest } from "../Actions/userAction";

const acceptRequestSlice = createSlice({
    name: 'acceptRequest',
    initialState: {
      requestResponse: null,
      acceptStatus: 'idle',
      acceptError: null,
    },
    reducers: {
      // Define other reducers if needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(acceptRequest.pending, (state) => {
          state.acceptStatus = 'loading';
        })
        .addCase(acceptRequest.fulfilled, (state, action) => {
          state.acceptStatus = 'succeeded';
          state.requestResponse = action.payload
          // Update notifications or set success state
        })
        .addCase(acceptRequest.rejected, (state, action) => {
          state.acceptStatus = 'failed';
          state.acceptError = action.payload;
        });
    },
  });
  
  // Export the reducer to include in the store
  export default acceptRequestSlice.reducer;