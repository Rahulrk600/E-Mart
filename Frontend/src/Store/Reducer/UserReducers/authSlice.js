import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//import api from '../../../api/axios.js'
import { localhost_api } from '../../api_local.js'
import { toast } from 'react-toastify'

import axios from 'axios'

// Register
export const userRegister = createAsyncThunk(
  'auth/userRegister',
  async (userData, thunAPI) => {
    try {
      //console.log("user", userData);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.post(`${localhost_api}/api/v1/users/register`, userData, config)
      //console.log(response.data);
      return response.data;
    } catch (error) {
      return thunAPI.rejectWithValue(error.response.data)
    }
  }
)

// loging
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, {rejectWithValue}) => {
    try {
      // console.log("user", credentials);
      const config = {withCredentials: true,}
      const response = await axios.post(`${localhost_api}/api/v1/users/login`, credentials, config)
      //  console.log(response.data);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)


    }
  }
)

//Logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunAPI) => {
    try {
      const config = {withCredentials: true}
      const response = await axios.post(`${localhost_api}/api/v1/users/logout`,{},config)
      console.log("res",response.data);
      
      return response.message

    } catch (error) {
         return thunAPI.rejectWithValue(error.response.data)
    }
  }
)

//refreshToken
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunAPI) => {
    try {
     // const config = {withCredentials: true,}
      const response = await axios.post(`${localhost_api}/api/v1/users/refresh-token`)
      
      return response.data

    } catch (error) {
         return thunAPI.rejectWithValue(error.response.data)
    }
  }
)

// get Login user
export const currentUser = createAsyncThunk(
  'auth/currentUser',
async (_, thunAPI) => {
  try {
    const config = {withCredentials: true,}
    const response = await axios.get(`${localhost_api}/api/v1/users/current-user`,config)
    return response.data

  } catch (error) {
       return thunAPI.rejectWithValue(error.response.data)
  }
})

//Update User Profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData, thunAPI) => {
    try {
      const config = {withCredentials: true,}
      const response = await axios.patch(`${localhost_api}/api/v1/users/update-profile`,userData,config)
      return response.data
  
    } catch (error) {
         return thunAPI.rejectWithValue(error.response.data)
    }
  }
)

//change current password
export const updateCurrentPassword = createAsyncThunk(
  'auth/updateCurrentPassword',
  async (userData, thunAPI) => {
    try {
      const config = {withCredentials: true,}
      const response = await axios.post(`${localhost_api}/api/v1/users/change-password`,userData,config)
      return response.data
  
    } catch (error) {
         return thunAPI.rejectWithValue(error.response.data)
    }
  }
)
// get All users by admin
export const getAllUsers = createAsyncThunk(
  'auth/getAllUsers',
async (_, thunAPI) => {
  try {
    const config = {withCredentials: true,}
    const response = await axios.get(`${localhost_api}/api/v1/users/admin/users`,config)
    //console.log("user",response.data);
    
    return response.data

  } catch (error) {
       return thunAPI.rejectWithValue(error.response.data)
  }
})

// get All users by admin
export const updateUserRole = createAsyncThunk(
  'auth/updateUserRole',
async ({userId, role}, thunAPI) => {
 // console.log("u",userId, "v",role);
  
  try {
    const config = {withCredentials: true,}
    const response = await axios.patch(`${localhost_api}/api/v1/users/admin/user/${userId}`,{role},config)
    toast.success("User role updated successfully")
    console.log("user1",response.data);
    
    return response.data

  } catch (error) {
    toast.error(error.response?.data?.message || "failed to update user role")
       return thunAPI.rejectWithValue(error.response.data)
  }
})

// get All users by admin
export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
async (userId, thunAPI) => {
  
  try {
    const config = {withCredentials: true,}
    const response = await axios.delete(`${localhost_api}/api/v1/users/admin/user/${userId}`,config)
    toast.success("User role deleted successfully")
   // console.log("user1",response.data);
    
    return response.data

  } catch (error) {
    toast.error(error.response?.data?.message || "failed to delete user")
       return thunAPI.rejectWithValue(error.response.data)
  }
})




const initialState = {
  users:[],
  user: null,
  status : 'idle',
  loading: false,
  isAuthenticated: false,
  accessToken : null,
  error: null

}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  // register
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.data;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || "User registered failed"
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.accessToken = action.payload.data.accessToken
        state.user = action.payload.data.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || 'Login failed'
      })

    //Logout
    .addCase(logoutUser.fulfilled, (state) =>{
      state.user = null;
      state.isAuthenticated =false;
      state.status = 'succeeded';
      state.accessToken =null
    })
    .addCase(logoutUser.rejected,(state,action)=>{
      state.status = 'failed';
      state.error = action.payload;
    })
    // refreshToken
    .addCase(refreshToken.fulfilled,(state, action)=>{
      state.accessToken = action.payload.accessToken;
    })
    ////currentUser
    .addCase(currentUser.pending, (state)=>{
      state.status= 'loading';
    })
    .addCase(currentUser.fulfilled,(state, action)=>{
      state.status = 'succeeded';
      state.isAuthenticated = true
      state.user = action.payload.data;
    })
    .addCase(currentUser.rejected,(state, action)=>{
      state.status = 'failed';
      state.isAuthenticated= false;
      state.error = action.payload.message;
    })
    //Update user Profile
    .addCase(updateUserProfile.pending,(state)=>{
      state.status = 'loading';
    })
    .addCase(updateUserProfile.fulfilled, (state, action)=>{
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.user = action.payload;
      state.error = null
    })
    .addCase(updateUserProfile.rejected,(state, action)=>{
      state.status = 'failed';
      state.error = action.payload;
    })
    
    // change current password
    .addCase(updateCurrentPassword.pending,(state)=>{
      state.status = 'loading'
    })
    .addCase(updateCurrentPassword.fulfilled, (state)=>{
      state.status = 'succeeded';
      state.error = null
    })
    .addCase(updateCurrentPassword.rejected ,(state, action)=>{
      state.status = 'failed'
      state.error = action.payload
    })
    //get All user by admin
    .addCase(getAllUsers.pending,(state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllUsers.fulfilled,(state,action)=>{
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(getAllUsers.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload
    })
    // update user role by admin
    .addCase(updateUserRole.pending,(state)=>{
      state.loading= true;
      state.error = null;
    })
    .addCase(updateUserRole.fulfilled,(state, action)=>{
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(updateUserRole.rejected,(state, action)=>{
      state.loading = false;
      state.error = action.payload;
    })
     // delete user  by admin
     .addCase(deleteUser.pending,(state)=>{
      state.loading= true;
      state.error = null;
    })
    .addCase(deleteUser.fulfilled,(state, action)=>{
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(deleteUser.rejected,(state, action)=>{
      state.loading = false;
      state.error = action.payload;
    })
  }

});
export const { clearError } = authSlice.actions
export default authSlice.reducer