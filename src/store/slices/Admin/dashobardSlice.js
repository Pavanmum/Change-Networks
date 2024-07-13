import { createSlice } from "@reduxjs/toolkit";

const initialState ={
      menuChanger : 'Dashboard',
      searchedValue:''
}


const dashboardSlice = createSlice({
    name : 'dashboardSlice',
    initialState,
    reducers:{
        setMenuChanger:(state, action)=>{
            state.menuChanger = action.payload
          },  
          setSearchedValue:(state, action)=>{
            state.searchedValue = action.payload
          }, 
    }

})
export const {setMenuChanger,setSearchedValue} = dashboardSlice.actions
export default dashboardSlice.reducer;