import React, { useEffect, useState } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { FaCreditCard, FaGooglePay } from 'react-icons/fa'
import { RiMoneyDollarBoxLine } from 'react-icons/ri'
import { LiaCcAmazonPay } from 'react-icons/lia'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { localhost_api } from '../../Store/api_local'
import { createOrder } from '../../Store/Reducer/orderSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../../Store/Reducer/cartSlice'

function Payment() {
  const [showUpiOptions, setShowUpiOptions] = useState(false)
  const [showCardOptions, setShowCartOptions] = useState(false)
  const [showPriceOptions, setShowPriceOptions] = useState(false);
  const [selectedPaymentMethod, setSelectPaymentMethod] = useState("Card")
  const [caseOnDel, setCaseOnDel] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.cart)
  const shippingInfo = useSelector((state) => state.shipping)
  const { error, success,} = useSelector((state) => state.order)
   


  const paymentData = {
    amount: Math.round(orderInfo.TotalAmount * 100)
  }

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subAmount,
    packagingFee: orderInfo.PackagingFee,
    deliveryCharges: orderInfo.deliveryCharges,
    discount: orderInfo.discount,
    totalPrice: orderInfo.TotalAmount,
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const paymentMethod = selectedPaymentMethod

      if (paymentMethod === "googlePay") {

        const googlePayConfig = {};
        const googlePayResult = await initiateGooglePayPayment(googlePayConfig);

        if (googlePayResult.success) {
         // dispatch(creorder());
          //navigate
        } else {
          throw new Error("googlePay payment failed ");
        }
      } else if (paymentMethod === "COD") {
        // skip payment processing and create order directly
        
          order.paymantInfo= { id: "Cash on Delivery", status: "panding" }
        
        console.log(orderInfo);
        
        dispatch(createOrder(order));
        //navigate("/success")


      } else if (paymentMethod === "Card") {
        // stripe card payment logic

        const config = {
          headers: {
            "Content-Type": "application/json",
          }, withCredentials: true
        };

        const { data } = await axios.post(`${localhost_api}/api/v1/payments/payment/process`, paymentData, config);

        const client_secret = data.data.client_secret;

        if (!stripe || !elements) return;

        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.fullName,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.stat,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country
              }
            }
          }
        });

        if (result.error) {
          toast.error(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            }
            dispatch(createOrder(order))
             navigate("/success");   
          }
          else {
            toast.error("There was an issue processing the payment");
          }
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);

    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    if (success) {
      toast.success("your order is Successful")
       dispatch(clearCart())
    }
  }, [dispatch, error, toast,success,clearCart])


  return (
    <div>
      <CheckoutSteps activeStep={3} />
      <div className='max-w-md mx-auto p-4 bg-white rounded-lg shadow-md'>
        <h2 className='text-sm text-gray-600 mb-2'>Payments</h2>
        <form onSubmit={submitHandler}>
          <div className=' space-y-3'>
            <div className='bg-gray-100 px-4  rounded-lg'>
              {showPriceOptions && (
                <div className='mt-4 text-sm text-gray-500 border-b'>
                  <div className='flex justify-between py-1'>
                    <p>{`Price (${cartItems.length} items)`}</p>
                    <p>{`${orderInfo?.subAmount}`}</p>
                  </div>
                  <div className='flex justify-between py-1'>
                    <p>{`Delivery Charges`}</p>
                    <p className='text-green-500'>{`${orderInfo?.subTotal <= 500 ? "₹40" : "Free"}`}</p>
                  </div>
                  <div className='flex justify-between py-1'>
                    <p>{`PackagingFee`}</p>
                    <p className=''>{`₹${orderInfo?.PackagingFee}`}</p>
                  </div>
                </div>
              )}
              <div className='flex items-center justify-between text-blue-600' onClick={() => setShowPriceOptions(!showPriceOptions)}>
                <span className='h-10 p-1 text-sm'>Total Amount<span className='ml-4 font-bold'>{"^"}</span></span>
                <span className='text-sm'>{`₹${orderInfo?.TotalAmount}`}</span>
              </div>
            </div>


            <div className='bg-gray-100 p-2 rounded-lg'>
              <div className='flex items-center justify-between cursor-pointer'
                onClick={() => setShowUpiOptions(!showUpiOptions)}
              >
                <div className='flex items-center'>
                  <p><LiaCcAmazonPay /></p>
                  <span className='ml-2 font-medium text-sm'>UPI</span>
                </div>
                <span>{showUpiOptions ? <MdArrowDropUp /> : <MdArrowDropDown />}</span>
              </div>
              {showUpiOptions && (
                <div className=' mt-2  text-sm text-gray-500  bg-white rounded-lg shadow-md p-3'>
                  <div className=' flex justify-between'>
                    <div>
                      <input
                        type='radio'
                        value="googlePay"
                        checked={selectedPaymentMethod === "googlePay"}
                        onChange={(e) => setSelectPaymentMethod(e.target.value)}
                        className='form-radio text-indigo-600 mt-2'
                      />
                      <span className='ml-2 text-sm sm:text-base'>Google Pay</span>
                    </div>
                    <FaGooglePay className='text-2xl mt-2 font-medium' />
                  </div>
                  <div className='mt-4'>
                    <button className='w-3/4 bg-orange-500 h-10 mx-10 text-black font-medium rounded-md hover:scale-110 transition-all'>{`pay ₹${orderInfo?.TotalAmount}`}</button>
                  </div>
                </div>
              )}
              {!showUpiOptions && (
                <p className='text-[12px] ml-8 text-green-500 mt-1'>Pay by any UpI app</p>
              )}
            </div>

            <div className='bg-gray-100 p-2 rounded-lg'>
              <div className='flex items-center justify-between cursor-pointer'
                onClick={() => setShowCartOptions(!showCardOptions)}
              >
                <div className='flex items-center'>
                  <p><FaCreditCard /></p>
                  <span className='ml-2 font-medium text-sm'>{`Credit/Debit/ATM Card`}</span>
                </div>
                <span>{showCardOptions ? <MdArrowDropUp /> : <MdArrowDropDown />}</span>
              </div>

              {showCardOptions && (
                <div className='grid place-items-center  bg-white h-auto'>
                  <input
                    type='radio'
                    value="Card"
                    checked={selectedPaymentMethod === "Card"}
                    onChange={(e) => setSelectPaymentMethod(e.target.value)}
                    className='-ml-72 mt-2'
                  />
                  <div className='mt-4 text-sm '>
                    <div>
                      <span className='text-[12px]'>card Number</span>
                      <div className=' relative'>
                        <FaCreditCard className=' absolute top-3 right-2' />
                        <CardNumberElement className='w-80 h-8 p-2 border rounded-md outline-none  border-blue-300' />
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <div>
                        <span className='text-[12px] mt-2'>Valid Thru</span>
                        <CardExpiryElement className='w-40 h-8 p-2 rounded-md  border outline-none  border-blue-400' />
                      </div>

                      <div>
                        <span className='text-[12px] mt-2'>cvv</span>
                        <CardCvcElement className='w-36 h-8 p-2 rounded-md border outline-none  border-blue-300' />
                      </div>
                    </div>
                    <div className='mt-4'>
                      <button type='submit' disabled={!stripe} className='w-3/4 bg-orange-500 h-10 mx-10 rounded-md hover:scale-110 transition-all text-black font-medium'>{`pay ₹${orderInfo?.TotalAmount}`}</button>
                    </div>
                  </div>
                </div>
              )}
              {!showCardOptions && (
                <p className='text-[12px] ml-8 text-green-500 mt-1'>Add and secure cards as per RBI guidelines</p>
              )}
            </div>

            <div className='bg-gray-100 p-2 rounded-lg'>
              <div className='flex items-center justify-between cursor-pointer'
                onClick={() => setCaseOnDel(!caseOnDel)}
              >
                <div className='flex items-center'>
                  <p><RiMoneyDollarBoxLine /></p>
                  <span className='ml-2 font-medium text-sm'>{`Case on Delivery`}</span>
                </div>
                <span>{caseOnDel ? <MdArrowDropUp /> : <MdArrowDropDown />}</span>
              </div>
              <div className='bg-white'>
                {caseOnDel && (
                  <div className='mt-4 text-sm text-gray-500'>
                    <input
                      type='radio'
                      value="COD"
                      checked={selectedPaymentMethod === "COD"}
                      onChange={(e) => setSelectPaymentMethod(e.target.value)}
                      className='ml-4 mt-2'
                    />
                    <p className='mb-2 ml-6'>Pay online now for safe and contactless delivery</p>
                    <button className='w-3/4 bg-orange-500 h-10 mx-10 rounded-md text-black font-medium hover:scale-110 transition-all'>{`Place Order`}</button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Payment
