import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImages as uploadImagesAPI } from '../../api/Admin/gallery.js'; // Importing the API function

const initialState={
  selectedImages: [],
    uploadProgress: 0,
    successMessage: false,
    errorMessage: null,
    loading: false,
    category: '',
}
// Async thunk for handling image upload
export const uploadImages = createAsyncThunk(
  'imageUpload/uploadImages',
  async ({ category, type, productCode, description, files,created_by }, { rejectWithValue, dispatch }) => {
    try {
      const data = await uploadImagesAPI({ category, type, productCode, description, files,created_by });
      dispatch(updateUploadProgress(100)); // Update progress to 100 when upload is successful
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    setSelectedImages: (state, action) => {
      state.selectedImages = action.payload;
    },
    removeSelectedImage: (state, action) => {
      state.selectedImages = state.selectedImages.filter((_, index) => index !== action.payload);
    },
    resetState: (state) => {
      state.selectedImages = [];
      state.uploadProgress = 0;
      state.successMessage = false;
      state.errorMessage = null;
      state.loading = false;
      state.category = ''
    },
    updateUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(uploadImages.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = true;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { setSelectedImages, removeSelectedImage, resetState, updateUploadProgress,setCategory } = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
