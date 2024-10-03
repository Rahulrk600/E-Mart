import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getSingalOrder,updateOrders } from '../../Store/Reducer/orderSlice'
import { useParams,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {Button} from '../index.js'
import { useForm } from 'react-hook-form'



function UpdateOrder() {
    
    const {register,handleSubmit,} = useForm()
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { order, loading, success, error } = useSelector((state) => state.order)
    const { user } = useSelector((state) => state.auth)

    console.log(order);
    

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

      const onSubmit = (data)=>{
        dispatch(updateOrders({id, status:data}))
        toast.success('order updated successfully')
        navigate('/admin/ordersList')
      }

  return (
    <div  className='w-full rounded-md min-h-[calc(100vh-70px)] bg-white shadow-md'>
      <div className='flex  items-center justify-center'>
        <div className='bg-white w-1/2 min-h-[calc(100vh-70px)]'>
        <div className='  w-full  shadow-md rounded-md bg-slate-200 p-2 mt-12'>
            <h3 className='ml-10 font-medium'>Deliver to: </h3>
            <div className='flex mt-2 ml-10 gap-6 font-normal'>
              <p className='font-normal'>Name:</p>
              <p className='text-sm'>{user?.fullName}</p>
            </div>

            <div className='flex mt-2 ml-10 gap-6 font-normal'>
              <p className='font-normal'>Address:</p>
              <p className='text-sm'>{order?.shippingInfo?.address} {order?.shippingInfo?.stat} {order?.shippingInfo?.pinCode}</p>
            </div>

            <div className='flex mt-2 ml-10 gap-6 font-normal'>
              <p className='font-normal'>Mobile-No:</p>
              <p className='text-sm'>{order?.shippingInfo?.phoneNo}</p>
            </div>
          </div>
          
          <div className=' shadow-md rounded bg-slate-200 py-2 mt-0.5'>
        <p className='ml-10 font-medium'>PaymentInfo </p>
        <p
          className={`
            ${order?.paymentInfo &&
              order?.paymentInfo?.status === "succeeded"}
              ? green : red  ml-16 mt-2 text-sm  font-medium ` 
          }
        >
          {order?.paymentInfo &&
            order?.paymentInfo?.status === "succeeded"
            ? "PAID"
            : "NOT PAID"}
        </p>
        <p className='ml-16 font-medium text-sm'>{`Amount  ₹${order?.totalPrice}`}</p>
      </div>

      <div className=' shadow-md rounded bg-slate-200 py-2 mt-0.5'>
        <p className='font-medium ml-10'>Order Status</p>
        <p className='text-sm font-medium ml-16'>{orderStatusPOS(order?.orderStatus)}</p>
        </div>
       
        <div className=' shadow-md rounded bg-slate-200 py-2 mt-0.5'>
        <p className='font-medium ml-10'>Order Item</p>
        {
            order && order?.orderItems?.map((item)=>(
                <div className='flex gap-8' key={item._id}>
                    <div className='mt-2'>
                  <img
                    src={item?.image}
                    alt='oho'
                    className='w-20 h-20  ml-10 object-cover mix-blend-multiply bg-gray-200 rounded-md'
                  />
                </div>
                <div className='mt-4  text-sm font-medium'>
                    <p>{item.name}</p>
                    <p>Quantity {item.quantity}</p>
                </div>
                <p className='mt-4 text-sm font-medium'>{`${item.quantity}X${item.price} = ₹${item.price* item.quantity} `}</p>
                </div>
            ))
        }
        </div>
        

        </div>
        <div className='bg-white w-5/12 min-h-[calc(100vh-70px)] border-l'>
            <h2 className='text-center text-xl font-medium mt-8 p-2'>Process Order</h2>
             <form onSubmit={handleSubmit(onSubmit)}>
               <div className='flex flex-col justify-center items-center '>
                <select 
                id={order?._id}
                 {...register('status',{required: true})}
                 className=' block w-32 h-8 rounded-md shadow-md'
                 >
                    <option value="" className=' hidden'>Select..</option>
                    {order?.orderStatus === "processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                       {order?.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                </select>
               <Button
               type='submit'
                childarn={'Submit'}
                classsName='mt-1 hover:bg-green-300'
               />
               </div>
             </form> 
        </div>
      </div>
    </div>
  )
}

export default UpdateOrder
