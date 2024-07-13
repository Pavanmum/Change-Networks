
import Cookies from 'js-cookie';
import { adminLogin, forgotPassword, refreshToken, verifyAndChangePassword, verifyToken } from "../../api/Admin/auth";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hashData } from '../../../helper/hashDetails';

// Async thunks
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await adminLogin(userData);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error during login:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await forgotPassword(email);
      return response;
    } catch (error) {
      console.error("Error during forgot password:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyAndChangePasswordAsync = createAsyncThunk(
  "auth/verifyAndChangePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await verifyAndChangePassword(data);
      return response;
    } catch (error) {
      console.error("Error during verify and change password:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = !!Cookies.get('accessToken');
      console.log(accessToken);
      return accessToken;
    } catch (error) {
      console.error("Error during checking auth status:", error.error);
      return rejectWithValue(error);
    }
  }
);

export const refreshTokenActionAsync = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const data = await refreshToken();
      return data;
    } catch (error) {
      console.error("Error during refresh token:", error);
      return rejectWithValue(error);
    }
  }
);


export const verifyJwtTokenAsync = createAsyncThunk(
  'auth/verifyJwtToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await verifyToken()
      console.log(response.data)
      let encryptedData =  response && response.data ? hashData(response.data) : null;
      localStorage.setItem('data', encryptedData);
      return response;
    } catch (error) {
      console.error("Error during verify token:", error);
      return rejectWithValue(error);
    }
  }
);

  const initialState = {
  datas: {},
  isAuthenticated: false || !!Cookies.get('accessToken'),
  error: null,
  emailData: [],
  verifyPassword: [],
  userDetial:[],
  isTokenLoading: false,
  isLoading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAuthTokenLoading: (state, action) => {
      state.isTokenLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.datas = action.payload;
        // state.isAuthenticated = true;
        console.log(state.datas)
        state.isLoading = false;
        state.error = null; // Reset error on success
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emailData = action.payload;
        state.error = null;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyAndChangePasswordAsync.fulfilled, (state, action) => {
        state.verifyPassword = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(verifyAndChangePasswordAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.isTokenLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
        console.log(action.payload);
        state.isTokenLoading = false;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isTokenLoading = false;
      })
      .addCase(refreshTokenActionAsync.fulfilled, (state) => {
        // state.isTokenLoading = false;
      })
      .addCase(refreshTokenActionAsync.rejected, (state, action) => {
        // state.isTokenLoading = false;
        state.error = action.payload;
        console.log(state.error);
      })
      .addCase(verifyJwtTokenAsync.fulfilled, (state, action) => {
        state.userDetial = action.payload;
        console.log(action.payload)
        state.isTokenLoading = false;
      })
      .addCase(verifyJwtTokenAsync.rejected, (state) => {
        state.userDetial = false;
      });
  },
});

export const selectToken = (state) => state.auth.isTokenLoading;
export const selectData = (state) => state.auth.datas;
export const selectUserDetail = (state) => state.auth.userDetial;
export const { setAuthenticated, setAuthLoading, setAuthTokenLoading } = authSlice.actions;

export default authSlice.reducer;
