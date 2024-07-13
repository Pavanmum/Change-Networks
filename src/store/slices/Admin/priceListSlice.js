import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brands: '',
  categories: '',
  conditions: '',
  locations: '',
  products: '',
  series: '',
  stocks: '',
  selectedBoxData:'',
  download:false,
  drawerOpen:false,
  checkboxes:{
    checkBox :true,
    Brand:true,
    Location:true,
    stock:true,
    condition:true,
    category:true,
    series:true,
    qty:true,
    description:true,
    remark:true
  }
};
const priceListSlice = createSlice({
  name: 'priceListSlice',
  initialState,
  reducers: {
    setBrands: (state, action) => {
      console.log(action.payload)
      state.brands = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setConditions: (state, action) => {
      state.conditions = action.payload;
    },
    setLocation: (state, action) => {
      state.locations = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSeries: (state, action) => {
      state.series = action.payload;
    },
    setStocks: (state, action) => {
      state.stocks = action.payload;

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
  setBrands,
  setCategories,
  setConditions,
  setLocation,
  setProducts,
  setSeries,
  setStocks,
  setSelectedBoxData,
  toggleCheckbox,
  setDownload,
  setDrawerOpen
} = priceListSlice.actions;

export default priceListSlice.reducer;
