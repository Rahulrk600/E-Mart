import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { localhost_api } from '../api_local';

export const createReview =createAsyncThunk(
    'review/createReview',
    async ({ratings, comment, productId},thankAPI)=>{
        try {
            const config = { withCredentials: true };
            const {data} = await axios.put(`${localhost_api}/api/v1/products/review`,{ratings,comment,productId},config);
            return data
        } catch (error) {
            return thankAPI.rejectWithValue(error.response.data.message || 'error creating review')
        }
    }
)

export const getAllReview =createAsyncThunk(
    'review/getAllReview',
    async (id,thankAPI)=>{
        
        try {
            const config = { withCredentials: true };
            const {data} = await axios.get(`${localhost_api}/api/v1/products/reviews/${id}`,config);
           // console.log("d",data.data);
            
            return data.data
        } catch (error) {
            return thankAPI.rejectWithValue(error.response.data.message || 'error creating review')
        }
    }
)


const reviewSlice = createSlice({
    name: 'review',
    initialState:{
        reviews:[],
        loading: false,
        success: false,
        error: null,
    },
    reducers:{
        resetReview:(state)=>{
            state.loading = false;
            state.success = false;
            state.error = null;
        },
        clearError:(state)=>{
            state.error=null
        }
    },
    // create review
    extraReducers:(builder)=>{
        builder
        .addCase(createReview.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createReview.fulfilled,(state, action)=>{
            state.loading = false;
            state.success = true;
            state.reviews.push(action.payload)
        })
        .addCase(createReview.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;

        })
        //get all review
        .addCase(getAllReview.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllReview.fulfilled,(state,action)=>{
            state.loading = false;
            state.reviews = action.payload;
        })
        .addCase(getAllReview.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export const {resetReview, clearError} = reviewSlice.actions;
export default reviewSlice.reducer