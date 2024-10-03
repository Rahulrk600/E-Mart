import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {localhost_api} from '../api_local.js'
import axios from 'axios';
import { toast } from 'react-toastify';
toast

// create order
export const createOrder = createAsyncThunk(
    'order/createOrder',
    async(orderData,{rejectWithValue})=>{
       // console.log(orderData);
        try {
            const config = {withCredentials: true};
            const {data} = await axios.post(`${localhost_api}/api/v1/orders/create/new/order`,orderData,config); 
            console.log("qqq",data);
            return data;
            
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

//get singal order
export const getSingalOrder = createAsyncThunk(
    'order/getSingalOrder',
    async(orderId,{rejectWithValue})=>{
        
        try {
            const config = {withCredentials: true};
            const {data} = await axios.get(`${localhost_api}/api/v1/orders/order/${orderId}`,config); 
           // console.log("get1",data);
            return data.data;
            
        } catch (error) {
            return rejectWithValue(response.error.data.message)
        }
    }
)

// get order by loggedIN user by id
export const getOrderByUser = createAsyncThunk(
    'order/getOrderByUser',
    async(_,{rejectWithValue})=>{
        
        try {
            const config = {withCredentials: true};
            const {data} = await axios.get(`${localhost_api}/api/v1/orders/myorders`,config); 
           // console.log("get2",data.data.myorder);
            return data.data.myorder;
            
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

// get all orders by Admin
export const getOrdersByAdmin = createAsyncThunk(
    'order/getOrdersByAdmin',
  
    async(_,thankAPI)=>{
      try {
        const config = {  withCredentials: true };
        const response = await axios.get(`${localhost_api}/api/v1/orders/orders`,config)
         // console.log(response.data.data);
           
          return response.data.data
      } catch (error) {
        return thankAPI.rejectWithValue(error.response?.data?.message)
      }
    }
  )

  // update orders by Admin
export const updateOrders = createAsyncThunk(
    'order/updateOrders',
  
    async({id,status},thankAPI)=>{
      try {
        const config = {  withCredentials: true };
        const response = await axios.put(`${localhost_api}/api/v1/orders/admin/order/${id}`,status,config)
          //console.log(response.data.data);
          return response.data.data
      } catch (error) {
        return thankAPI.rejectWithValue(error.response?.data?.message)
      }
    }
  )

   // update orders by Admin
export const deleteOrder = createAsyncThunk(
    'order/deleteOrders',
  
    async(id,thankAPI)=>{
      try {
        const config = {  withCredentials: true };
         await axios.delete(`${localhost_api}/api/v1/orders/admin/order/${id}`,config)
         // console.log(response.data.data);
         toast.success("order deleted successfully")
          return response.orderId
      } catch (error) {
        return thankAPI.rejectWithValue(error.response?.data?.message)
      }
    }
  )


const initialState = {
    orders:[],
    order:null,
    loading:false,
    success:false,
    error: null
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearError(state){
            state.error=null;
          }
    },
    // create order
    extraReducers:(builder)=>{
        builder
        .addCase(createOrder.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        .addCase(createOrder.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.orders = action.payload;
        })
        .addCase(createOrder.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        //get single order
        .addCase(getSingalOrder.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getSingalOrder.fulfilled,(state,action)=>{
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(getSingalOrder.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload;
        })
        // get orders by loggedin user
        .addCase(getOrderByUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getOrderByUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase(getOrderByUser.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload;
        })
        //get all orders by admin
        .addCase(getOrdersByAdmin.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getOrdersByAdmin.fulfilled,(state,action)=>{
            state.loading = false;
            state.orders = action.payload;
            
        })
        .addCase(getOrdersByAdmin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        //delete order
        .addCase(deleteOrder.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteOrder.fulfilled,(state,action)=>{
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(deleteOrder.rejected,(state,action)=>{
            state.loading =false;
            state.error = action.payload;
        })
         //update order
         .addCase(updateOrders.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(updateOrders.fulfilled,(state,action)=>{
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(updateOrders.rejected,(state,action)=>{
            state.loading =false;
            state.error = action.payload;
        })
    },
});

export const {clearError } = orderSlice.actions;
export default orderSlice.reducer;