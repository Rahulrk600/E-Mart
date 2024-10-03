import axios from "axios";
import {  refreshToken } from '../Store/Reducer/UserReducers/authSlice';
import store from '../Store/store'

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

api.interceptors.response.use(async(config)=>{
 const state = store.getState();
 const accessToken = state.auth.accessToken;

  if(accessToken){
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
    (response)=> response,
    async(error) =>{
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest._retry ){
            originalRequest._retry = true;
            
                await store.dispatch(refreshToken());
                const state = store.getState();
                const newAccessToken = state.auth.accessToken
               if(newAccessToken){
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
               }
            }  
        
        return Promise.reject(error)
    }
);
export  default api