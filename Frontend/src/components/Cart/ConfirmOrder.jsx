import React from 'react'
import {useNavigate} from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import CartItems from './CartItems'

function ConfirmOrder() {

  const shippingInfo = useSelector((state) => state.shipping)
  const {cartItems} = useSelector((state)=> state.cart)
  const {user} = useSelector((state)=> state.auth)
  const navigate = useNavigate();
  

  const subAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const deliveryCharges = subAmount <= 500 ? 40 : 0;
  const PackagingFee = 29;
  const discount = 0

  let TotalAmount = 0
  if (subAmount <= 500) {
      TotalAmount = subAmount + PackagingFee + discount + 40
  } else {
      TotalAmount = subAmount +PackagingFee + discount
  } 


  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.stat}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;

  const proceedToPayment = () => {
    const data = {
      subAmount,
      PackagingFee,
      discount,
      deliveryCharges,
      TotalAmount,
    };
    sessionStorage.setItem('orderInfo', JSON.stringify(data))

    navigate("/process/payment");
  };
  
 
  return (
    <>
      <CheckoutSteps activeStep={2} />
      <div className='flex flex-col sm:flex-row'>
        <div>
          <div className='sm:ml-64 container mx-auto  w-full  shadow-md rounded-md bg-white p-2'>
            <h3 className='ml-10 font-medium'>Deliver to: </h3>
            <div className='flex mt-2 ml-10 gap-6 font-normal'>
              <p className='font-normal'>Name:</p>
              <p className='text-sm'>{user?.fullName}</p>
            </div>

            <div className='flex mt-2 ml-10 gap-6 font-normal'>
              <p className='font-normal'>Address:</p>
              <p className='text-sm'>{address}</p>
            </div>

            <div className='flex mt-2 ml-10 gap-6 font-normal'>
              <p className='font-normal'>Mobile-No:</p>
              <p className='text-sm'>{shippingInfo?.phoneNo}</p>
            </div>
          </div>

          <div className=' w-full sm:ml-64 container mx-auto  shadow-md bg-slate-200 mt-2 p-2'>
            <div className='mt-1'>
              {
                cartItems &&
                cartItems.map((item) => (
                  <div className='' key={item?.id + "abc"}>
                    <CartItems item={item} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className='w-full sm:w-80 shadow-md bg-white p-2 rounded-md sm:ml-72 h-80 '>
          <h3 className='text-lg font-serif'>Price Details</h3>
          <div className='flex justify-between mt-2'>
            <p>{`Price (${cartItems.length} items)`}</p>
            <p>{`₹${subAmount}`}</p>
          </div>
          <div className='flex justify-between mt-2'>
            <p>{`Discount`}</p>
            <p className='text-green-400'>{`0`}</p>
          </div>
          <div className='flex justify-between mt-2'>
            <p>{`Delivery Charges`}</p>
            <p className='text-green-400'>{`${subAmount <= 500 ? "₹40" : "Free Delivery"}`}</p>
          </div>

          <div className='flex justify-between mt-2'>
            <p>{`Packaging Fee`}</p>
            <p>{`₹${PackagingFee}`}</p>
          </div>
          <div className='flex justify-between mt-4 border-t border-b h-10'>
            <p className='mt-1'>{`Total Amount`}</p>
            <p className='mt-1'>{`₹${TotalAmount}`}</p>
          </div>
          <div className='mt-14 border-t h-10 shadow-lg rounded-md cursor-pointer hover:bg-yellow-300'>
            <p onClick={proceedToPayment} className="ml-28 mt-1 text-green-500 font-medium ">Continue</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default ConfirmOrder
