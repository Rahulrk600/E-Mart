import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { search } from '../../Store/Reducer/productSlice'
import {SearchProductCard} from '../index'

function SearchProduct() {
    const dispatch = useDispatch()
    const {products, loading} = useSelector((state)=> state.products)
    const query = useLocation()

    console.log("produ",products);
    useEffect(()=>{
        dispatch(search(query.search))
    },[dispatch,query])
    
  return (
    <div className=' container mx-auto p-4'>
     {
      loading &&(
        <p className='text-center text-lg font-medium'>Loading.....</p>
      )
     }
     <div className=' container mx-auto py-1'>
       {
        !loading && (
          <h2 className=' font-semibold mb-4'>{`Search Result: (${ products?.length})`}</h2>
        )
       }
        <div className='grid grid-cols-2 grid-rows-2 sm:grid-cols-5 gap-6'>
           {
            !loading && products?.map((product )=>(
              <SearchProductCard key={product._id} product={product}/>
            ))
           }
        </div>
        {
       !loading  && products?.length === 0 &&(
        <p className=' text-red-500 bg-white text-sm font-medium p-4 text-center '>No Products match your keyword.....</p>
       )
     }
      </div>
    </div>
  )
}

export default SearchProduct
