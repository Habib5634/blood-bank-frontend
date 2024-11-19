// scrollSlice.js
import { createSlice } from '@reduxjs/toolkit';

const scrollSlice = createSlice({
  name: 'scroll',
  initialState: {
    direction: null, // initial direction is null
  },
  reducers: {
    setScrollDirection: (state, action) => {
      state.direction = action.payload;
    },
  },
});

export const { setScrollDirection } = scrollSlice.actions;
export default scrollSlice.reducer;
