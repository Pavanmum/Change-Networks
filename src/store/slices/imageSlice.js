import {  fetchAllByCategory, fetchAllImages } from "../api/imageApi"

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchImagesAsync = createAsyncThunk('image/fetchImage', async ({ searchTerm,searchCategory }) => {
    console.log(searchTerm ,"searchTerm")
    const response = await fetchAllImages({product:searchTerm, category:searchCategory}); 
    return response.data;
});


export const fetchImagesByCategoryAsync = createAsyncThunk('image/fetchImageByCategory', async ({ categorySearch }) => {
    console.log(categorySearch)
    const response = await fetchAllByCategory({category:categorySearch});
    return response.data;
})




const initialState = {
    images: [],
    isLoading: false,
    error: null,
    category: [],
    categorySearch: '',
    isCategoryLoading:false,
    searchCategory:'',
    searchTerm: '',
}



 const images = createSlice({
    name: 'imageSlice',
    initialState : initialState,
    reducers: {
        setLoading: (state,action) => {
            state.isLoading = action.payload
        },
        setSearchTerm: (state,action) => {
            state.searchTerm = action.payload
            console.log( state.searchTerm ,"action.payload")
        },
        setCategorySearch: (state,action) => {
            state.categorySearch = action.payload
        },
        setCategoryLoading: (state,action) => {
            state.isCategoryLoading = action.payload
        },
        setSearchCategory: (state,action) => {
            state.searchCategory = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImagesAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchImagesAsync.fulfilled, (state,action) => {
                state.images = action.payload
                console.log(action.payload)
                state.isLoading = false
                state.error = null
            })
            .addCase(fetchImagesAsync.rejected, (state,action) => {
                state.isLoading = false
                state.error = action.error.message
                console.log(action.error.message)
            })
            .addCase(fetchImagesByCategoryAsync.pending, (state) => {
                state.isCategoryLoading = true
            })
            .addCase(fetchImagesByCategoryAsync.fulfilled, (state,action) => {
                state.category = action.payload
                state.isCategoryLoading = false
                state.error = null
            })
            
            .addCase(fetchImagesByCategoryAsync.rejected, (state,action) => {
                state.isCategoryLoading = false
                state.error = action.error.message
                console.log(action.error.message)
            })
    }
})

export const selectImages = (state) => state.imageSlice.images
export const imageIsLoading = (state) => state.imageSlice.isLoading
export const selectCategory = (state) => state.imageSlice.category
export const categoriesLoading = (state) => state.imageSlice.isCategoryLoading

export const {setLoading,setSearchTerm,setSearchCategory,setCategorySearch,setCategoryLoading} = images.actions

export default images.reducer;