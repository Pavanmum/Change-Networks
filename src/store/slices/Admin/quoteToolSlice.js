import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    selectedCustomerDetails:'',
}

const quoteToolSlice = createSlice({
    name: 'quoteToolSlice',
    initialState,
    reducers: { 

        setSelectedCustomerDetails:(state, action)=>{
          state.selectedCustomerDetails = action.payload
        },
       
      },
    });

export const { setSelectedCustomerDetails} = quoteToolSlice.actions;
export default quoteToolSlice.reducer;