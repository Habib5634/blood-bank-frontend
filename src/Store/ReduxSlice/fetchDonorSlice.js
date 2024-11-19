
import { createSlice} from '@reduxjs/toolkit';
import { fetchDonors, searchDonors} from '../Actions/userAction';



const donorSlice = createSlice({
  name: 'fetchDonor',
  initialState: {
    donorData: null,
    loadingDonorData: false,
    errorDonor: null,
    isSearching: false,
  },
  reducers: {
    clearSearch: (state) => {
      state.donorData = [];
      state.isSearching = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonors.pending, (state) => {
        state.loadingDonorData = true;
        state.errorDonor = null;
      })
      .addCase(fetchDonors.fulfilled, (state, action) => {
        state.loadingDonorData = false;
        state.donorData = action.payload;
      })
      .addCase(searchDonors.pending, (state) => {
        state.loadingDonorData = true;
        state.errorDonor = null;
      })
      .addCase(searchDonors.fulfilled, (state, action) => {
        state.loadingDonorData = false;
        state.donorData = action.payload;
        state.isSearching = true;
      })
      .addCase(fetchDonors.rejected, (state, action) => {
        state.loadingDonorData = false;
        state.errorDonor = action.payload;
      })
      .addCase(searchDonors.rejected, (state, action) => {
        state.loadingDonorData = false;
        state.errorDonor = action.payload;
      });
  },
});

export const { clearSearch } = donorSlice.actions;

export default donorSlice.reducer;