import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Reducer/UserReducers/authSlice';
import productSlice from './Reducer/productSlice';
import reviewSlice from './Reducer/reviewSlice';
import cartSlice from './Reducer/cartSlice';
import shippingInfoSlice from './Reducer/shippingInfoSlice';
import orderSlice from './Reducer/orderSlice';
import themeSlice from './Reducer/themeSlice'

 const  store = configureStore({
    reducer:{
     auth: authReducer,
     products: productSlice,
     review: reviewSlice,
     cart: cartSlice,
     shipping:shippingInfoSlice,
     order: orderSlice,
     theme: themeSlice
    }
 });

 export default store; 