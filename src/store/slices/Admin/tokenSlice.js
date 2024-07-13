// store/slices/Admin/tokenSlice.js
import { createSlice } from '@reduxjs/toolkit';



const tokenSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    isLoading: true,
    error: null,
  },
  reducers: {
    // setAuthLoading: (state, action) => {
    //   state.isLoading = action.payload;
    // },
    // setAuthSuccess: (state) => {
    //   state.isAuthenticated = true;
    //   state.isLoading = false;
    //   state.error = null;
    // },
    // setAuthFailure: (state, action) => {
    //   state.isAuthenticated = false;
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export const { setAuthLoading, setAuthSuccess, setAuthFailure } = tokenSlice.actions;

export default tokenSlice.reducer;
