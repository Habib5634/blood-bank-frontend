
import { createSlice} from '@reduxjs/toolkit';
import { fetchRequest } from '../Actions/userAction';



const fetchRequestSlice = createSlice({
  name: 'requests',
  initialState: {
    requests: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    errorRequest: null,
  },
  reducers: {
    updateRequests(state, action) {
      state.requests = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.requests = action.payload;
      })
      .addCase(fetchRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.errorRequest = action.payload;
      });
  },
});


export const { updateRequests } = fetchRequestSlice.actions;
export default fetchRequestSlice.reducer;