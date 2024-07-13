import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    selectedBoxData:[],
    download:false,
    selectedStatus:{
        All : true,
        Q1 : true,
        Q2 : true,
        Q3 : true,
        Q4 : true
    },
    year:'',
    reload:false

    
}


const salesMatrixSlice = createSlice({
    name : 'salesMatrixSlice',
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
          setYear:(state,action)=>{
            state.year = action.payload
          },
          setReload:(state,action)=>{
            state.reload = action.payload
          },
         
    }

})
export const {setSelectedBoxData,setSelectedStatus,setDownload,setYear,setReload} = salesMatrixSlice.actions
export default salesMatrixSlice.reducer;