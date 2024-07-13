import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { careerSubmission, jobDescription, jobDescriptionById, sendOtp, verifyOtp } from "../api/careerApi";





export const fetchAllJobDescriptionAsync = createAsyncThunk(
    'career/fetchJobDescription',
    async () => {
        const response = await jobDescription();
        return response.data;
    }
)

export const fetchJobDescriptionByIdAsync = createAsyncThunk(
    'career/fetchJobDescriptionById',
    async (id) => {
        console.log(id)
        const response = await jobDescriptionById(id);
        return response.data;
    }
)

export const verifyOtpAsync = createAsyncThunk(
    'auth/verifyOtp',
    async (otped, { rejectWithValue }) => {
      try {
        const response = await verifyOtp(otped);
        return response;
      } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      }
    }
  );

export const sendOtpAsync = createAsyncThunk(
    'career/sendOtp',
    async (email,{rejectWithValue}) => {
        try {
            const response = await sendOtp(email);
            console.log(response)
            return response;    
        } catch (error) {
            return rejectWithValue(error.message);
        }
        
    }
)

export const addCandidateAsync = createAsyncThunk(
    "career/addCandidate",
    async (formData) => {
        console.log(formData)
        const response = await careerSubmission(formData);
        return response.data;
    }
)

const initialState = {
    data : [],
    isLoading: false,
    totalData: 0,
    error : null,
    status:'idle',
    id: "",
    singleData: [],
    isLoadingSingle: false,
    isModalOpen: false,
    showPassword: false,
    otpStatus: 'idle',
    email: "",
    otped: "",
    EmailError: "",
    sentEamil: {},
    isLoadingOtp: false,
    otpResponse: []
}

const careerSlice = createSlice({
    name: 'careerSlice',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setId : (state, action) => {
            state.id = action.payload
            console.log(state.id)
        },
        setLoadingSingle: (state, action) => {
            state.isLoadingSingle = action.payload
        },
        setModalOpen: (state, action) => {
            state.isModalOpen = action.payload
        },
        setShowPassword: (state, action) => {
            state.otpError = ""
            state.showPassword = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setOtpVerification: (state, action) => {
            state.otped = action.payload
            console.log(action.payload)
        },
        setEmailError: (state, action) => {
            state.EmailError = action.payload
        },
        clearSuccessMessage: (state) => {
             state.sentEamil = {}; 
        },
        resetEmailAndOtp: (state) => {
            state.email = "";
            state.otped = "";
        },



    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllJobDescriptionAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAllJobDescriptionAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null
                state.data = action.payload
                state.totalData = action.payload.totalCount
            })
            .addCase(fetchAllJobDescriptionAsync.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(fetchJobDescriptionByIdAsync.pending, (state) => {
                state.isLoadingSingle = true
            })
            .addCase(fetchJobDescriptionByIdAsync.fulfilled, (state, action) => {
                state.isLoadingSingle = false
                state.error = null
                state.singleData = action.payload
            })
            .addCase(sendOtpAsync.pending, (state) => {
                state.showPassword = false
                state.isLoadingOtp = true

            })
            .addCase(sendOtpAsync.fulfilled, (state,action) => {
                state.showPassword = true
                state.isLoadingOtp = false
                state.sentEamil = action.payload
                console.log(action.payload)
            })
            .addCase(sendOtpAsync.rejected, (state,action) => {
                state.showPassword = false
                state.EmailError = action.payload
                console.log(action.payload)
            })
            .addCase(verifyOtpAsync.pending, (state) => {
                state.setModalOpen = true
                state.showPassword = true
                state.error= null
                state.status = 'idle';
            })
            .addCase(verifyOtpAsync.fulfilled, (state,action) => {
                state.isModalOpen = false
                state.showPasswordhowPassword = false
                state.otpResponse = action.payload
                state.status = 'success'
                state.error = null
                console.log(action.payload)
            })
            .addCase(verifyOtpAsync.rejected, (state,action) => {
                state.isModalOpen = true
                state.showPassword = true
                state.status = 'failed'
                console.log(state.status)
                state.error =action.payload;
            })
            .addCase(addCandidateAsync.pending,( state,action) => {
                state.isLoading = true
            } )
            .addCase(addCandidateAsync.fulfilled,( state,action) => {
                state.isLoading = false
                state.status = 'success'
            } )
    }
})

export const { setLoading, setId,setLoadingSingle,setModalOpen,setShowPassword,setEmail,setOtpVerification,setEmailError,clearSuccessMessage,resetEmailAndOtp  } = careerSlice.actions;

export default careerSlice.reducer;



