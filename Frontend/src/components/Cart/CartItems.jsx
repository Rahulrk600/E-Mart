import React from 'react'
import { MdDelete } from 'react-icons/md'
import { incrementQuantity, decrementQuantity, removeItemFormCrt } from '../../Store/Reducer/cartSlice';
import { useDispatch } from 'react-redux';
import ReactStars from 'react-stars'

function CartItems({ item }) {


    const dispatch = useDispatch();
    const options ={
        edit:false,
        color:"rgba(20,20,20.0.1)",
        activeColor:"yellow",
        size: window.innerWidth < 650 ? 16 : 21,
        isHalf:true,
        value:item.ratings
        
    };


    const handIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handalDecreaseQuantity = (id) => {
        dispatch(decrementQuantity(id));
    };

    const handalRemoveItem = (id) => {
        dispatch(removeItemFormCrt(id))
    }

    return (
        <div className=' shadow-md mx-auto max-w-lg  bg-white mt-2 '>
            <div className='flex items-center '>
                <img
                    src={item?.image[0]}
                    alt={item?.name}
                    className='w-16 h-16 sm:w-20 sm:h-20 object-cover mr-4 rounded-lg'
                />
                <div className='ml-4 flex-1'>
                    <h3 className='text-lg font-medium'>{item?.name}</h3>
                    <p className='text-sm '><ReactStars {...options}/></p>
                    <p className='text-sm font-semibold'>{item?.price}</p>
                    <p className='text-sm text-green-400'>status- in-Stock</p>
                </div>
                <div>
                    <p className='mr-6 text-sm'>{`₹${item.price * item.quantity
                        }`}</p>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-2 place-items-center w-full h-10 border-t border-l '>
                <div className='border px-1 relative cursor-pointer hover:scale-110'>
                    <MdDelete name='btn' className='mt-1 absolute text-red-400' />
                    <p onClick={() => { handalRemoveItem(item.id) }} name="btn" className=' shadow-md w-14 ml-4 text-red-400 '>remove</p>
                </div>
                <div className='border px-1'>
                    <button
                        onClick={() => handalDecreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                        className='w-3 h-5 shadow-lg bg-red-400 text-white rounded-md text-xs mr-1 cursor-pointer'>-</button>
                    {item?.quantity}
                    <button
                        onClick={() => { handIncrement(item.id) }}
                        disabled={item.quantity >= item.stock}
                        className='w-3 h-5 shadow-lg bg-green-400 text-white rounded-md text-xs ml-1 cursor-pointer'
                    >+</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems
