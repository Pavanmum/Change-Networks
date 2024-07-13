import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    selectedBoxData:'',
    customer:'',
    download:false,
    search:'',
    reload:false

}

const emailMatrixSlice = createSlice({
    name : 'emailMatrixSlice',
    initialState,
    reducers:{
        setSelectedBoxData:(state, action)=>{
            state.selectedBoxData = action.payload
          },
        
          setDownload:(state,action)=>{
            state.download = action.payload
          },
        
          setCustomer:(state,action)=>{
            state.customer = action.payload
          },
          setSearch:(state,action)=>{
            state.search = action.payload
          },
          setReload:(state,action)=>{
            state.reload=action.payload
          }
    }

})
export const {setSelectedBoxData,setSelectedStatus,setReload,setDownload,setDrawerOpen,setCustomer,setSearch} = emailMatrixSlice.actions
export default emailMatrixSlice.reducer;