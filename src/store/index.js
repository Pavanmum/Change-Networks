import { configureStore } from "@reduxjs/toolkit";
import * as reducers from "./slices";
import authReducer from '../store/slices/Admin/authSlice';



const store = configureStore({
    reducer:{
        imageSlice : reducers.imageSlice,
        careerSlice : reducers.careerSlice,
        imageUpload : reducers.imageUploadSlice,
        emailMatrixSlice:reducers.emailMatrixSlice,
        priceListSlice : reducers.priceListSlice,
        tokenSlice : reducers.tokenSlice,
        jobSlice : reducers.jobSlice,
        candidateSlice : reducers.candidateSlice,
        userAdmin : reducers.userAdmin,
        auth : authReducer,
        promotionSlice : reducers.promotionSlice,
        weightListSlice : reducers.weightListSlice,
        customerListSlice:reducers.customerListSlice,
        salesMatrixSlice:reducers.salesMatrixSlice,
        accessSlice:reducers.access,
        quoteToolSlice:reducers.quoteToolSlice,
        quoteMatrixSlice:reducers.quoteMatrixSlice,
        dashboardSlice:reducers.dashboardSlice
    }
})


export default store;