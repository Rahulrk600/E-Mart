import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { localhost_api } from '../api_local'
import axios from 'axios';
import { toast } from 'react-toastify';

//fetched  product categories
export const productCategories = createAsyncThunk(
  'products/productCategories',
  async(_,thankAPI)=>{
    try {
      const response = await axios.get(`${localhost_api}/api/v1/products/get/categoryProduct`);
        return response.data.data
    } catch (error) {
      return thankAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

//fetched  product categories
export const categoryProduct = createAsyncThunk(
  'products/categoryProduct',
  async(category,thankAPI)=>{
    try {
      const response = await axios.post(`${localhost_api}/api/v1/products/get/products/by/category`,{category});
      console.log("mmm,",response.data);
      
        return response.data
    } catch (error) {
      return thankAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)


// createProduct
export const createProducts = createAsyncThunk(
  'products/createProducts',
  async(data,thankAPI)=>{
    console.log("data",data);
    
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true, };
      const response = await axios.post(`${localhost_api}/api/v1/products/admin/create/newProduct`,data,config);
        return response.data
    } catch (error) {
      return thankAPI.rejectWithValue(error.response.data)
    }
  }
)

// get all products
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async({price,ratings,category},thankAPI)=>{

     let link = `${localhost_api}/api/v1/products/all/products?price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
     
     
     if(category) {
       link = `${localhost_api}/api/v1/products/all/products?price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
       console.log("lonk",link);
    }
    try {
      const response = await axios.get(link)
         console.log(response.data.data);
         
        return response.data.data
    } catch (error) {
      return thankAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

// get Product details
export const getProductDetails = createAsyncThunk(
  'products/getProductDetails',
  async(productId,thankAPI)=>{
   // console.log("id",productId);
    
    try {
      const config = { withCredentials: true };
      const response = await axios.get(`${localhost_api}/api/v1/products/product/${productId}`,config);
        return response.data.data
    } catch (error) {
      return thankAPI.rejectWithValue(error.response.data.message || 'failed to fetch product details')
    }
  }
)
 
export const search = createAsyncThunk(
  'products/search',
  async(query,thankAPI)=>{
    
    try {
      const config = { withCredentials: true };
      const response = await axios.get(`${localhost_api}/api/v1/products/search${query}`,config);
      console.log("qur2", response.data);
      
        return response.data.data
    } catch (error) {
      return thankAPI.rejectWithValue(error.response.data.message || 'failed to fetch search product ')
    }
  }
)

// get all products by Admin
export const getProductsByAdmin = createAsyncThunk(
  'products/getProductsByAdmin',

  async(_,thankAPI)=>{
    try {
      const config = {  withCredentials: true };
      const response = await axios.get(`${localhost_api}/api/v1/products/admin/product`,config)
        // console.log(response.data);
         
        return response.data
    } catch (error) {
      return thankAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

// get all products by Admin
export const updateProduct = createAsyncThunk(
  'products/updateProduct',

  async({id, productData},thankAPI)=>{
    //console.log("produ", id);
    
    try {
      const config = {  withCredentials: true };
      const response = await axios.patch(`${localhost_api}/api/v1/products/B/admin/product/${id}`,productData,config)
         console.log(response.data);
         
        return response.data
    } catch (error) {
      return thankAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

// get all products by Admin
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',

  async({id},thankAPI)=>{
    //console.log("produ", id);
    
    try {
      const config = {  withCredentials: true };
       await axios.delete(`${localhost_api}/api/v1/products/B/admin/product/${id}`,config)
         //console.log(response.data);
         toast.success("product deleted successfully")
        return productId
    } catch (error) {
      toast.error(error)
      return thankAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)

const initialState = {
    categories:[],
    categoryProducts:[],
    products:[],
    productsCount:0,
    resultPerPage: 10,
    filterProductCount: 0,
    product:null,
    loading: false,
    status : 'idle',
    error: null
  
  }

  const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      clearError(state){
        state.error=null;
      }
    },
  //fetch products categories
    extraReducers: (builder) => {
      builder
      .addCase(productCategories.pending,(state)=>{
        state.status = 'loading';
        state.error = null;
      })
      .addCase(productCategories.fulfilled,(state, action)=>{
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(productCategories.rejected,(state, action)=>{
        state.status = 'failed';
        state.error = action.payload;
      })
      // creacte Products
      .addCase(createProducts.pending,(state)=>{
        state.loading = true;
        state.error = null
      })
      .addCase(createProducts.fulfilled,(state, action)=>{
        state.loading = false;
        state.product = action.payload
      })
      .addCase(createProducts.rejected,(state, action)=>{
        state.loading = false;
        state.error = action.payload
      })
      //get all products
      .addCase(getProducts.pending,(state)=>{
        state.loading = true;
      })
      .addCase(getProducts.fulfilled,(state,action)=>{
        state.loading= false;
        state.products= action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filterProductCount = action.payload.filterProductCount;
      })
      .addCase(getProducts.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      //get product details
      .addCase(getProductDetails.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled,(state,action)=>{
        state.loading =false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected,(state,action)=>{
         state.loading = false;
         state.error = action.error.message;
      })
      //search
      .addCase(search.pending,(state)=>{
        state.loading = true;
      })
      .addCase(search.fulfilled,(state,action)=>{
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(search.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload
      })
      //category's products
      .addCase(categoryProduct.pending,(state)=>{
        state.loading = true,
        state.error = null
      })
      .addCase(categoryProduct.fulfilled,(state, action)=>{
        state.loading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(categoryProduct.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload
      })
      //get all Products by Admin
      .addCase(getProductsByAdmin.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByAdmin.fulfilled,(state,action)=>{
        state.loading= false;
        state.products = action.payload.data;
      })
      .addCase(getProductsByAdmin.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      // update product
      .addCase(updateProduct.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled,(state,action)=>{
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.error.payload;
      })
      // delete product
      .addCase(deleteProduct.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled,(state,action)=>{
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(deleteProduct.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })

    }
    });
    export const {clearError} = productSlice.actions;
    export default productSlice.reducer

  