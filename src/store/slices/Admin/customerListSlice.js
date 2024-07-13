import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    selectedBoxData:'',
    customer:'',
    download:false,
    drawerOpen:false,
    selectedStatus:'',
    search:''
}

const customerListSlice = createSlice({
    name : 'customerListSlice',
    initialState,
    reducers:{
        setSelectedBoxData:(state, action)=>{
            state.selectedBoxData = action.payload
          },
          setSelectedStatus:(state,action)=>{
            state.selectedStatus = action.payload
         },
          setDownload:(state,action)=>{
            state.download = action.payload
          },
          setDrawerOpen:(state,action)=>{
            state.drawerOpen = action.payload
          },
          setCustomer:(state,action)=>{
            state.customer = action.payload
          },
          setSearch:(state,action)=>{
            state.search = action.payload
          }
    }

})
export const {setSelectedBoxData,setSelectedStatus,setDownload,setDrawerOpen,setCustomer,setSearch} = customerListSlice.actions
export default customerListSlice.reducer;