import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCheckBox: false,
  selectedCheckBoxData: [],
  selectEditBox:false,
  customerUserData: [],
};

const quoteMatrixSlice = createSlice({
  name: "quoteMatrixSlice",
  initialState,
  reducers: {
    setSelectedCheckBox: (state, action) => {
      state.selectedCheckBox = action.payload;
    },
    setSelectedCheckBoxData: (state, action) => {
      state.selectedCheckBoxData = action.payload;
    },
    setCustomerUserData: (state, action) => {
      state.customerUserData = action.payload;
    },
    setSelectEditBox: (state, action) => {
      state.selectEditBox = action.payload;
    },
  },
});

export const {
  setSelectedCheckBoxData,
  setSelectedCheckBox,
  setCustomerUserData,
  setSelectEditBox,
} = quoteMatrixSlice.actions;
export default quoteMatrixSlice.reducer;
