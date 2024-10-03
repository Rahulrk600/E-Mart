import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderByUser } from '../../Store/Reducer/orderSlice'
import { Link } from 'react-router-dom'

function MyOrder() {
  const dispatch = useDispatch()
  const [selectItem, setSelectItem] = useState(null)
  const { orders, error, loading } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getOrderByUser())
  }, [dispatch])

  const handalSelect = (index) => {
    setSelectItem(index)
  }

  const orderStatusPOS = (status) => {
        switch (status) {
          case 'processing':
            return <span className='text-blue-500'>Processing</span>
        case 'Shipped':
             return <span className='text-yellow-500'>Shipped</span>  
          case 'Delivered':
            return <span className='text-green-500'>Delivered</span>
          case 'cancelled':
            return <span className='text-red-500'>Cancelled</span>
          default:
            return <span>{status}</span>
        }
      };


  return (
    <div className='  sm:max-w-xl max-w-lg  mx-auto p-4 '>
      <div className=' mb-2'>
        <h3 className='text-xl font-bold text-center'>My Order</h3>
      </div>
      <div className=' space-y-1'>
        {
          orders && orders.length > 0 && (
            orders.map((order) => (
              <div key={order._id}>
                {
                  order.orderItems?.map((item, index) => (
                    <Link to={`/order/${order?._id}`} className='flex sm:gap-20 gap-2 bg-white shadow-md rounded-md p-2 text-sm text-gray-800 font-medium mt-4 hover:bg-slate-100' key={index}>
                        <div className='flex bg-gray-200 '>
                          <img
                            src={item.image}
                            alt='img_orderItems'
                            className='h-20 object-scale-down w-20 mix-blend-multiply rounded-md shadow-md '
                          />
                        </div>
                        <div className='ml-4'>
                          <p className='mt-2'>{`${order.
                            createdAt} -`}{orderStatusPOS(order.orderStatus)}</p>
                          <p className='mt-1'>{item.name}</p>
                        </div>
                        <span className='mt-8 mr-2 sm:mr-4 font-bold text-sm'>{`>`}</span>
                    </Link>
                  ))
                }
                <div>
                </div>
              </div>
            ))
          )
        }
      </div>



    </div>

  )
}

export default MyOrder
