import React from 'react'
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'
import CartItems from './CartItems'
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Cart() {
    const { cartItems } = useSelector((state) => state.cart);

    const subAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    let TotalAmount = 0
    if (subAmount <= 500) {
        TotalAmount += 40 + 29 + 0 + subAmount
    } else {
        TotalAmount += 0 + 29 + 0 + subAmount
    }

    return (
        <>
            {
                cartItems.length === 0 ?
                    <div className='flex justify-center items-center text-red-500 p-4 mt-10'>
                        <MdOutlineRemoveShoppingCart className='h-8 w-8' />
                        <h1 className='text-xl font-bold'>No Product In Your Cart</h1>
                    </div>
                    : (
                        <div className=' container mx-auto w-full max-h-screen p-6'>
                            <div className='flex  justify-center flex-col sm:flex-row'>
                                <div className='sm:w-[50%]'>
                                    {
                                        cartItems &&
                                        cartItems.map((item) => (
                                            <div className='' key={item?.id + "abc"}>
                                                <CartItems item={item} />
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='w-full sm:w-80 shadow-md bg-white p-2 rounded-md mt-2 h-80 '>
                                    <h3 className='text-lg font-serif'>Price Details</h3>
                                    <div className='flex justify-between mt-2'>
                                        <p>{`Price (${cartItems.length} items)`}</p>
                                        <p>{`₹${cartItems.reduce(
                                            (acc, item) => acc + item.quantity * item.price, 0)}`}</p>
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
                                        <p>{`₹29`}</p>
                                    </div>
                                    <div className='flex justify-between mt-4 border-t border-b h-10'>
                                        <p className='mt-1'>{`Total Amount`}</p>
                                        <p className='mt-1'>{TotalAmount}</p>
                                    </div>
                                     <Link to={'/shippingDetails'}>
                                    <div className='mt-14 border-t h-10 shadow-lg rounded-md cursor-pointer hover:bg-yellow-300'>
                                        <p className="ml-28 mt-1 text-green-500 font-medium ">Place order</p>
                                    </div>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Cart
