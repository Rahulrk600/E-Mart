import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getAllUsers } from '../../Store/Reducer/UserReducers/authSlice'
import { getOrdersByAdmin } from '../../Store/Reducer/orderSlice'
import { getProductsByAdmin } from '../../Store/Reducer/productSlice'
import { Link } from 'react-router-dom'

function Dashbord() {
 
   const dispatch = useDispatch();
   const {users} = useSelector((state)=> state.auth)
   const {products} = useSelector((state)=> state.products)
   const {orders} = useSelector((state)=> state.order)

   console.log( products, orders)

   useEffect(()=>{
      dispatch(getOrdersByAdmin())
      dispatch(getAllUsers())
      dispatch(getProductsByAdmin())
   },[dispatch])

  return (
       <div className='p-6 bg-white flex-1 shadow-md min-h-[calc(100vh-70px)]'>
         <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 cursor-pointer'>
            <Link to={'/admin/usersList'} className='bg-cyan-400 p-6 rounded-lg shadow-md'>
               <h2 className=' font-medium mb-4 text-center'>Users</h2>
               <p className='text-center text-xl'>{users?.data?.length}</p>
            </Link>
            <Link to={'/admin/productsList'} className='bg-red-400 p-6 rounded-lg shadow-md'>
               <h2 className=' font-medium mb-4 text-center'>Products</h2>
               <p className='text-center text-xl'>{products?.length}</p>
            </Link>
            <Link to={'/admin/ordersList'} className='bg-green-400 p-6 rounded-lg shadow-md'>
               <h2 className=' font-medium mb-4 text-center'>Orders</h2>
               <p className='text-center text-xl'>{orders?.orders?.length}</p>
            </Link>
            <div className='bg-purple-400 p-6 rounded-lg shadow-md '>

               <h2 className=' font-medium mb-4 text-center'>Total Amount</h2>
               <p className='text-center text-xl'>₹{orders?.totalAmout}</p>
            </div>
        </div>
       </div>
  )
}

export default Dashbord
