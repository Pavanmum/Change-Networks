import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddJob, deleteJob, updateJob } from "../../api/Admin/job";


export const AddJobAsync = createAsyncThunk(
    "job/addJob",
    async (userData,{rejectWithValue}) => {
        try {
        const response = await AddJob(userData);
        return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
) 


export const UpdateJobAsync = createAsyncThunk(
    "job/updateJob",
    async ({data,id},{rejectWithValue}) => {
        console.log(data,id)
        try {
        const response = await updateJob(data,id);
        return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const DeleteJobAsync = createAsyncThunk(
    "job/deleteJob",
    async (id,{rejectWithValue}) => {
        try {
        const response = await deleteJob(id);
        return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


const initialState = {
    job: [],
    status: "idle",
    error: null
}

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        clearJob: (state) => {
            state.job = [];
            state.status = "idle";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(AddJobAsync.pending , (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(AddJobAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.job = action.payload;
        })
        .addCase(AddJobAsync.rejected , (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(UpdateJobAsync.pending , (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(UpdateJobAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.job = action.payload;
        })
        .addCase(UpdateJobAsync.rejected , (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(DeleteJobAsync.pending , (state) => {
            state.status = "loading";
        })
        .addCase(DeleteJobAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.job = action.payload;
        })
        .addCase(DeleteJobAsync.rejected , (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
    }
})


export const { clearJob } = jobSlice.actions;

export default jobSlice.reducer;