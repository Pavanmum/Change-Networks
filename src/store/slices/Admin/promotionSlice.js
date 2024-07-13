import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locations: '',
  selectedBoxData:'',
  download:false,
  drawerOpen:false,
  products:'',
  checkboxes:{
    checkBox :true,
    Brand:true,
    Location:true,
    condition:true,
    category:true,
    qty:true,
    description:true,
    remark:true
  }
};
const promotionSlice = createSlice({
  name: 'promotionSlice',
  initialState,
  reducers: { 
    setLocation: (state, action) => {
      state.locations = action.payload;
    },
    setProducts: (state, action) => {
        state.products = action.payload;
      },
    setSelectedBoxData:(state, action)=>{
      state.selectedBoxData = action.payload
    },
    toggleCheckbox: (state, action) => {
      const checkboxName = action.payload;
      state.checkboxes[checkboxName] = !state.checkboxes[checkboxName];
    },
    setDownload:(state,action)=>{
      state.download = action.payload
    },
    setDrawerOpen:(state,action)=>{
      state.drawerOpen = action.payload
    }
  },
});

export const {
  setLocation,
  setSelectedBoxData,
  toggleCheckbox,
  setProducts,
  setDownload,
  setDrawerOpen
} = promotionSlice.actions;

export default promotionSlice.reducer;
