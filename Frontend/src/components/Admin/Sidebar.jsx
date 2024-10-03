import React from 'react'
import {Link} from 'react-router-dom'


function Sidebar() {
  return (
    
        <aside  className='bg-blue-300 min-h-full w-full max-w-64 shadow-md'>
              <h1 className='text-center mt-0 w-full bg-white p-4 font-bold '>ADMIN DASHBORD</h1>
            <div className='flex flex-col justify-center items-center shadow-md p-3 mt-8'>
              <div className='bg-gray-100 w-full shadow-md rounded-md text-black text-sm  '>
              <h2 className='ml-4 text-[16px] font-[400] p-1 '>Product</h2>
              </div>
              <Link to={'/admin/productsList'} className='text-sm  hover:text-red-400 mt-2 p-1'>All Products</Link>
              <Link to={'/admin/add/New/Product'} className='text-sm  hover:text-red-400 mt-2'>Create Product</Link>
            </div>

            <div className='flex flex-col justify-center items-center shadow-md p-3 mt-1'>
              <div className='bg-gray-100 w-full shadow-md rounded-md text-black text-sm '>
              <h2 className='ml-4 text-[16px]  p-1 font-[400]'>Order</h2>
              </div>
              <Link to={'/admin/ordersList'} className='text-sm  hover:text-red-400 mt-2 p-1'>All Orders</Link>
            </div>

            <div className='flex flex-col justify-center items-center shadow-md p-3 mt-1'>
              <div className='bg-gray-100 w-full shadow-md rounded-md text-black text-sm'>
              <h2 className='ml-4 text-[16px] font-[400] p-1'>User</h2>
              </div>
              <Link to={'/admin/usersList'} className='text-sm  hover:text-red-400 mt-2 p-1'>All Users</Link>
            </div>

            <div className='flex flex-col justify-center items-center shadow-md p-3 mt-1'>
              <div className='bg-gray-100 w-full shadow-md rounded-md text-black text-sm'>
              <h2 className='ml-4 text-[16px] font-[400] p-1'>Rating</h2>
              </div>
              <Link to={'/admin/reviewsList'} className='text-sm  hover:text-red-400 mt-2 p-1'>All Reviews</Link>
            </div>
        </aside>
      
  )
}

export default Sidebar
