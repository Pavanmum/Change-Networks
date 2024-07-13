import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { candidateListApi } from "../../api/Admin/candidate.js";


export const candidateListAsync = createAsyncThunk(
    "candidate/candidateListAsync",
    async () => {
        try {
            const response = await candidateListApi();
            console.log(response)
            return response;
        } catch (error) {
            console.error("Internal Server Error", error);
            return error;
        }
    }
) 


const initialState = {
    data: [],
    error: null,
    isLoading: false,
}


const candidateSlice = createSlice({
    name: "candidate",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(candidateListAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(candidateListAsync.fulfilled, (state, action) => {
                state.data = action.payload;
                console.log(action.payload)
                state.isLoading = false;
            })
            .addCase(candidateListAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
})

export const { setLoading } = candidateSlice.actions;

export default candidateSlice.reducer;
