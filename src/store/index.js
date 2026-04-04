import { configureStore } from '@reduxjs/toolkit';
import homeReducer from "./../pages/HomeTemplate/Home/slice"
import detailMovieReducer from "./../pages/HomeTemplate/Detail/slice"
import authReducer from "./../pages/AdminTemplate/Auth/slice"
import addUserReducer from './../pages/AdminTemplate/AddUser/slice';
import checkoutReducer from '../pages/HomeTemplate/Checkout/slice'; 
import bookingReducer from "../pages/HomeTemplate/Booking/slice"

const store = configureStore({
    reducer: {
        homeReducer,
        detailMovieReducer,
        authReducer,
        addUserReducer,
        checkoutReducer, 
        bookingReducer,
    },
});

export default store;