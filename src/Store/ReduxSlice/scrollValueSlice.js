// scrollSlice.js
import { createSlice } from '@reduxjs/toolkit';

const scrollSlice = createSlice({
  name: 'scrollValue',
  initialState: {
    value: 0, // initial scroll value is 0
  },
  reducers: {
    setScrollValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setScrollValue } = scrollSlice.actions;
export default scrollSlice.reducer;
