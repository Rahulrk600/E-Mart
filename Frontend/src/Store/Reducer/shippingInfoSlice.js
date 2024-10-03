import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address:"",
    city:"",
    stat:"",
    country:"",
    pinCode:"",
    phoneNo:"",
    ...(JSON.parse(localStorage.getItem('shippingDetails')) || {})
};

const shippingInfoSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        saveShippingDetails:(state, action)=>{
            const {address, city, stat, country, pinCode, phoneNo} = action.payload;
            state.address = address;
            state.city = city;
            state.stat = stat;
            state.country = country;
            state.pinCode = pinCode;
            state.phoneNo = phoneNo

            localStorage.setItem('shippingDetails', JSON.stringify(state))
         },
    }
});

export const {  saveShippingDetails} = shippingInfoSlice.actions;
export default shippingInfoSlice.reducer;