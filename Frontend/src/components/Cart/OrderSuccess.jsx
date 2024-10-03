import React from 'react'
import { Link } from 'react-router-dom'
import {CiCircleCheck} from 'react-icons/ci'

function OrderSuccess() {
  return (
    <div className='min-h-screen mx-auto  flex items-center justify-center'>
       <div className='bg-white rounded-lg shadow-lg p-6 max-w-full text-center'>
         <CiCircleCheck className='ml-32 text-green-500 w-10 h-10'/>
         <p className='text-green-500'>Your Order has been Placed successfully</p>
        <Link to='/orders' className='text-blue-600 ml-4'>View Orders</Link>
       </div>
       
    </div>
  )
}

export default OrderSuccess
