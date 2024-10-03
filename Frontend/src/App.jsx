import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LayOut from './routers/LayOut'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import SignIn from './components/Login'
//import ProtectedRoute from './routers/ProtectedRouter'
import Profile from './components/Profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { currentUser, refreshToken } from './Store/Reducer/UserReducers/authSlice'
import store from './Store/store'
import { UpdatePassword, ForgotPassword, ResetPassword, UpdateProfile, NewProduct, ProductDetails, Cart, ShippingDetails, ConfirmOrder, PaymentCheck, OrderSuccess, MyOrder, OrderDetails, SearchProduct, AllProducts, CategoryProducts, Dashbord, DashbordLayout, ProductList,OrdersList,UpdatePrduct,UpdateOrder,UserList,ReviewLists } from './components/index'





function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, accessToken, user } = useSelector((state) => state.auth)

  useEffect(() => {
    store.dispatch(currentUser());
  }, []);

  if (!accessToken)
    dispatch(refreshToken);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LayOut />}>
        <Route path='' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/search' element={<SearchProduct />} />
        <Route path='/allProducts' element={<AllProducts />} />
        <Route path='/category/products/:categoryName' element={<CategoryProducts />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />



        {/** Protected route for user */}
        <Route path='/profile' element={isAuthenticated ? <Profile /> : <SignIn />} />
        <Route path='/updateProfile' element={isAuthenticated ? <UpdateProfile /> : <SignIn />} />
        <Route path='/updatePassword' element={isAuthenticated ? <UpdatePassword /> : <SignIn />} />
        <Route path='/shippingDetails' element={isAuthenticated ? <ShippingDetails /> : <SignIn />} />
        <Route path='/order/confirm' element={isAuthenticated ? <ConfirmOrder /> : <SignIn />} />
        <Route path='/process/payment' element={isAuthenticated ? <PaymentCheck /> : <SignIn />} />
        <Route path='/success' element={isAuthenticated ? <OrderSuccess /> : <SignIn />} />
        <Route path='/orders' element={isAuthenticated ? <MyOrder /> : <SignIn />} />
        <Route path='/order/:id' element={isAuthenticated ? <OrderDetails /> : <SignIn />} />

        {/** Protected route for admin */}
        <Route path='/admin' element={isAuthenticated && user?.role === 'admin' ? <DashbordLayout /> : <SignIn />}>
          <Route path='dashbord' element={isAuthenticated && user?.role === 'admin' ? <Dashbord /> : <SignIn />} />
          <Route path='add/New/Product' element={isAuthenticated && user?.role === 'admin' ? <NewProduct /> : <SignIn />} />
          <Route path='product/:id' element={isAuthenticated && user?.role === 'admin' ? <UpdatePrduct /> : <SignIn />} />
          <Route path='productsList' element={isAuthenticated && user?.role === 'admin' ? <ProductList /> : <SignIn />} />
          <Route path='ordersList'element={isAuthenticated && user?.role === 'admin' ? <OrdersList/>: <SignIn/>}/>
          <Route path='order/:id'element={isAuthenticated && user?.role === 'admin' ? <UpdateOrder/>: <SignIn/>}/>
          <Route path='usersList' element={isAuthenticated && user?.role === 'admin' ? <UserList /> : <SignIn />} />
          <Route path='reviewsList' element={isAuthenticated && user?.role === 'admin' ? <ReviewLists /> : <SignIn />} />
        </Route>
      </Route>
    )
  )


  return (
    <>
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </>
  )
}

export default App
{/* <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
          <Profile/>
        </ProtectedRoute>} />
   */}
{/* <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
        <Route path='/profile' element={<Profile/>}/>
        </Route> */}
