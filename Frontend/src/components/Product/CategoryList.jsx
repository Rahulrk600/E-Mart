import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { productCategories } from '../../Store/Reducer/productSlice' 
import {FcApproval} from 'react-icons/fc'

function CategoryList() {
    const dispatch = useDispatch()
    const {categories, loading} = useSelector((state) => state.products)
   

   useEffect(()=>{
      dispatch(productCategories())
   },[dispatch])

    return (
       <>
       {
        loading ?(
            <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
            <div className=' cursor-pointer animate-pulse '>
                            <Link  className=' w-10 h-10 sm:w-16 sm:h-16 rounded-full p-3 overflow-hidden bg-gray-300 flex items-center justify-center animate-pulse'>
                                <FcApproval className='h-0 w-0 object-cover mix-blend-multiply hover:scale-125 transition-all animate-pulse ' />
                            </Link>
                            <p className='text-center text-sm sm:text-base capitalize w-20 h-4 mt-2 animate-pulse bg-gray-300'></p>
                           </div>
                { 
                   
                    categories?.map((product,index)=>{
                        return(
                            <Link  className=' cursor-pointer animate-pulse' key={product._id}>
                            <div className=' w-10 h-10 sm:w-16 sm:h-16 rounded-full p-3 overflow-hidden bg-gray-300 flex items-center justify-center animate-pulse'>
                                <img src="" alt="" className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all animate-pulse bg-gray-300 ' />
                            </div>
                            <p className='text-center text-sm sm:text-base capitalize w-20 h-4 animate-pulse bg-gray-300'></p>
                           </Link>
          
                        )
                    })
                }
            </div>

        </div>
        ):(
            <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
            <div className=' cursor-pointer'>
                            <Link to={`/allProducts`} className=' w-10 h-10 sm:w-14 sm:h-14 rounded-full p-3 overflow-hidden bg-white flex items-center justify-center '>
                                <FcApproval className='h-full w-full object-cover mix-blend-multiply hover:scale-125 transition-all ' />
                            </Link>
                            <p className='text-center text-sm sm:text-base capitalize'>{`All Products `}</p>
                           </div>
                { 
                   
                    categories?.map((product,index)=>{
                        return(
                            <Link to={`/category/products/${product?.category}`} className=' cursor-pointer' key={product._id}>
                            <div className=' w-10 h-10 sm:w-14 sm:h-14 rounded-full p-3 overflow-hidden bg-white flex items-center justify-center'>
                                <img src={product?.images[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all ' />
                            </div>
                            <p className='text-center text-sm sm:text-base capitalize'>{product?.category}</p>
                           </Link>
          
                        )
                    })
                }
            </div>

        </div>
        )
       }
       </>
    )
}

export default CategoryList
