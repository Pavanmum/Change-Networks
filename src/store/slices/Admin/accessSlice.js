import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { accessLevel } from "../../api/Admin/accessLevel";


export const accessLevelAsync = createAsyncThunk(
    "access/update",
    async ({ editAccess,viewAccess, }) => {
        console.log("Edit Access: ", viewAccess);
        const response = await accessLevel(editAccess, viewAccess);
        console.log(response)
        return response;
    }
);

const initialState = {
    access: [],
    loading: false,
    error: null,
    viewAccess: {},
    editAccess: {},
};


export const access = createSlice({
    name: "access",
    initialState,
    reducers:{
        setViewAccess: (state, action) => {
            state.viewAccess = action.payload;
        },
        setEditAccess: (state, action) => {
            state.editAccess = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(accessLevelAsync.pending, (state) => {
            state.loading = true;
        })
        .addCase(accessLevelAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.access = action.payload;
        })
        .addCase(accessLevelAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    }
});

export const { setViewAccess, setEditAccess } = access.actions;

export const selectAccess = (state) => state.accessSlice.access;

export default access.reducer;
