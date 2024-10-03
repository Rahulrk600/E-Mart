import React,{useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {FaAngleRight,FaAngleLeft} from 'react-icons/fa6'
import { categoryProduct } from '../../Store/Reducer/productSlice'


function Horizontal_card({category,heading}) {

    const dispatch = useDispatch()
    const {categoryProducts, loading} = useSelector((state)=> state.products)
    const [scroll ,setScroll] = useState(0)
    const scrollElement = useRef()

    useEffect(()=> {
        if(category){
        dispatch(categoryProduct(category))
        }
     },[dispatch,category])
    
     const scrollRight = ()=>{
        scrollElement.current.scrollLeft += 300
     }

     const scrollLeft = ()=>{
        scrollElement.current.scrollLeft -= 300
     }

    return (
        <div className=' container mx-auto px-4 my-6 relative bg-pink-100'>
            {
                loading ?(
                    <h2 className='text-xl font-semibold py-4 animate-pulse w-28  bg-gray-300'></h2>
                ):
                (
                    <h2 className='text-xl font-semibold py-4'>{heading}</h2>
                )
            }
            <div className='flex items-center gap-4 sm:gap-6 overflow-scroll scrollbar-none transition-all ' ref={scrollElement}>
            <button onClick={scrollLeft} className='bg-white shadow-md rounded-full absolute left-0 hidden sm:block'><FaAngleLeft/></button>
            <button onClick={scrollRight}  className='bg-white shadow-md rounded-full absolute right-0 hidden sm:block'><FaAngleRight/></button>
                {
                   loading ?(
                    categoryProducts?.data?.map((product, index) => {
                        return (
                            <div className=' animate-pulse  w-full min-w-[206px] max-w-[206px]  h-28 sm:h-36 bg-white shadow rounded-lg sm:min-w-[250px] sm:max-w-[250px] flex mb-4' >
                                <div className= ' animate-pulse bg-slate-200 h-full p-3 min-w-[120px] sm:min-w-[130px] rounded-md'>
                                    <img src=""
                                        alt=""
                                        className=' animate-pulse object-scale-down h-full hover:scale-110 transition-all'
                                    />
                                </div>
                                <div className=' animate-pulse p-3 sm:p-4 text-center '>
                                    <h2 className='animate-pulse font-medium text-base sm:text-lg text-ellipsis line-clamp-1  h-4 w-20 bg-gray-300 mt-2'></h2>
                                    <p className='font-medium text-base animate-pulse  line-through  h-4 w-20 bg-gray-300 mt-2'></p>
                                    <h2 className='font-medium text-base animate-pulse  h-4 w-20 bg-gray-300 mt-2'></h2>
                                    <p className='animate-pulse  h-4 w-20 bg-gray-300 mt-2'></p>
                                </div>
                            </div>

                        )
                    })
                   ):(
                    !loading && categoryProducts?.data?.map((product, index) => {
                        return (
                            <div className='w-full min-w-[206px] max-w-[206px]  h-28 sm:h-36 bg-white shadow rounded-lg sm:min-w-[250px] sm:max-w-[250px] flex mb-4' key={product?._id}>
                                <div className='bg-slate-200 h-full p-3 min-w-[120px] sm:min-w-[130px] rounded-md'>
                                    <img src={product?.images[0]}
                                        alt={product?.category}
                                        className=' object-scale-down h-full hover:scale-110 transition-all'
                                    />
                                </div>
                                <div className='p-3 sm:p-4 text-center'>
                                    <h2 className=' font-medium text-base sm:text-lg text-ellipsis line-clamp-1'>{product?.name}</h2>
                                    <p className='font-medium text-base  line-through'>₹{product?.price}</p>
                                    <h2 className='font-medium text-base  text-green-600'>5% off</h2>
                                    <p>₹{product?.price *95/100}</p>
                                </div>
                            </div>

                        )
                    })
                   )
                }
            </div>
        </div>
    )
}

export default Horizontal_card
