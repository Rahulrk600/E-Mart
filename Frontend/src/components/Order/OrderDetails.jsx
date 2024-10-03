import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingalOrder } from '../../Store/Reducer/orderSlice'
import { toast } from 'react-toastify'

function OrderDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { order, error } = useSelector((state) => state.order)
  //console.log("pp",order);
  


  useEffect(() => {
    if (error) {
      toast.error(error)
    }

    dispatch(getSingalOrder(id))
  }, [dispatch, id, error, toast])

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
    <div className='max-w-lg mx-auto p-6'>
      <h2 className='text-center font-bold'>Order Details</h2>
      <div className=' shadow rounded-md p-2 bg-white mt-1 border-b'>
        <h2 className='ml-4 text-sm '>{`Order-Id -  ${order?._id}`}</h2>
      </div>
      <div className=' flex shadow-md rounded-md bg-white mt-1'>
        <p className='ml-2'>PaymentInfo - </p>
        <p
          className={`
            ${order?.paymentInfo &&
              order?.paymentInfo?.status === "succeeded"}
              ? green : red  ml-2` 
          }
        >
          {order?.paymentInfo &&
            order?.paymentInfo?.status === "succeeded"
            ? "PAID"
            : "NOT PAID"}
        </p>
      </div>
      <div className=' justify-between   shadow rounded-md p-2 bg-white mt-1 '>
        <p className='p-2 ml-2'>{orderStatusPOS(order?.orderStatus)}</p>
        {
          order && order?.orderItems.length > 0 && (
            order?.orderItems?.map((item, i) => (
              <div className='flex  justify-between border-b mt-2' key={i}>
                <div className=' ml-4'>
                  <p>{item?.name}</p>
                  <p>{item?.price}</p>
                </div>
                <div>
                  <img
                    src={item?.image}
                    alt='oho'
                    className='w-20 h-20 object-cover mix-blend-multiply bg-gray-200 rounded-md'
                  />
                </div>
              </div>
            ))
          )
        }

      </div>
      <div className=' shadow-md rounded-md  bg-white mt-2 '>
        <h3 className='text-sm font-medium  border-b p-2 ml-2 '>Shipping Details</h3>
        <div className='ml-4 py-2 '>
          <p className='font-medium '>{order?.user && order?.user.fullName}</p>
          <div className='flex  justify-between  mr-8 mt-1'>
            <p>Address </p>
            <p>{`${order?.shippingInfo?.address}`}</p>
          </div>

          <div className='flex  justify-between  mr-8 mt-1'>
            <p>City </p>
            <p>{`${order?.shippingInfo?.city}`}</p>
          </div>

          <div className='flex  justify-between  mr-8 mt-1'>
            <p>state </p>
            <p>{`${order?.shippingInfo?.stat}`}</p>
          </div>

          <div className='flex  justify-between  mr-8 mt-1'>
            <p>PinCode</p>
            <p>{`${order?.shippingInfo?.pinCode}`}</p>
          </div>
          <div className='flex  justify-between  mr-8 mt-1'>
            <p>Phone-Number </p>
            <p>{`${order?.shippingInfo?.phoneNo}`}</p>
          </div>
        </div>
      </div>
      <div className=' shadow-md rounded-md  bg-white mt-2 '>
        <h3 className='text-sm font-medium  border-b p-2 ml-2'>Price Details</h3>
        <div className='ml-4'>
          <div className='flex  justify-between mr-8  mt-1'>
            <p>itemPrice </p>
            <p>{`₹${order?.itemsPrice}`}</p>
          </div>
          <div className='flex  justify-between mr-8  mt-1'>
            <p>Discount </p>
            <p>{`- ₹${order?.discount}`}</p>
          </div>
          <div className='flex  justify-between mr-8  mt-1'>
            <p>DeliveryCharges </p>
            <p>{`₹${order?.deliveryCharges}`}</p>
          </div>
          <div className='flex  justify-between mr-8  mt-1'>
            <p>PackagingFee </p>
            <p>{`₹${order?.packagingFee}`}</p>
          </div>
          <div className='flex  justify-between mr-8  mt-1 border-b border-t py-2'>
            <p>TotalPrice </p>
            <p>{`₹${order?.totalPrice}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
