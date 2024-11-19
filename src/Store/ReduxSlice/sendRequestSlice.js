import { createSlice } from "@reduxjs/toolkit";
import { sendRequest } from "../Actions/userAction";

const sendRequestSlice = createSlice({
    name: 'sendRequest',
    initialState: {
      sendRequestStatus: 'idle',
      sendRequestError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(sendRequest.pending, (state) => {
          state.sendRequestStatus = 'loading';
          state.sendRequestError = null;
        })
        .addCase(sendRequest.fulfilled, (state, action) => {
          state.sendRequestStatus = 'succeeded';
          // alert(action.payload); // Show success message
        })
        .addCase(sendRequest.rejected, (state, action) => {
          state.sendRequestStatus = 'failed';
          state.sendRequestError = action.payload;
          console.log('Error sending request:', action.payload);
        });
    },
  });
  
  export default sendRequestSlice.reducer;