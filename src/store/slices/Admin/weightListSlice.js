import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    selectedBoxData:'',
    download:false,
    drawerOpen:false,
    checkboxes:{
      checkBox :true,
      weightKG:true,
      weightLBS:true,
      dimension:true
    }
}

const weightListSlice = createSlice({
    name: 'weightListSlice',
    initialState,
    reducers: { 

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

export const { setSelectedBoxData,toggleCheckbox,setDownload,setDrawerOpen} = weightListSlice.actions;
export default weightListSlice.reducer;