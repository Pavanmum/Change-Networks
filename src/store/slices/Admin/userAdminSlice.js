import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAdmin,addUserAdmin, getAdminTypes } from "../../api/Admin/userAdmin";

export const userAdminAsync = createAsyncThunk(
    "UserAdmin/userAdmin",
    async ({userType,department},{rejectWithValue}) => {
        try {
        const response = await userAdmin(userType,department);
        console.log(response)
        return response;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const addUserAdminAsync = createAsyncThunk(
    "UserAdmin/addUserAdmin",
    async (data, {rejectWithValue}) => {
        try {
            const response = await addUserAdmin(data);
            console.log(response.data)
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const userAdminTypesAsync = createAsyncThunk(
    "UserAdmin/userAdminTypes",
    async (_,{rejectWithValue}) => {
        try {
        const response = await getAdminTypes();
        console.log(response)
        return response;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    user: [],
    status: "idle",
    error: null,
    success: "idle",
    type: [],
    userType : "",
    department: ''
}


const userAdminSlice = createSlice({
    name: "userAdmin",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = [];
            state.status = "idle";
        },
        setUserType : (state, action) => {
            state.userType = action.payload;
        },
        setDepartment : (state, action) => {
            state.department = action.payload;
        }        
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(userAdminAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(userAdminAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = "success";
        })
        .addCase(userAdminAsync.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "failed";
        })
        .addCase(addUserAdminAsync.pending, (state) => {
            state.success = "loading";
            state.error = null;
            state.user = [];
        })
        .addCase(addUserAdminAsync.fulfilled, (state, action) => {
            // state.user = action.payload;
            state.success = "success";
            console.log(action.payload)
           ;
        })
        .addCase(addUserAdminAsync.rejected, (state, action) => {
            state.error = action.payload;
            state.success = "failed";
            state.user = [];
        })
        .addCase(userAdminTypesAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(userAdminTypesAsync.fulfilled, (state, action) => {
            state.type = action.payload;
        })
        .addCase(userAdminTypesAsync.rejected, (state, action) => {
            state.error = action.payload;
        })
        
    }
})

export const selectUserAdmin = (state) => state.userAdmin.user;

export const {clearUser,setDepartment,setUserType} = userAdminSlice.actions;

export default userAdminSlice.reducer;