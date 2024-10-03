import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SearchProductCard } from '../index'
import { categoryProduct } from '../../Store/Reducer/productSlice'


function CategoryProducts() {

  const params = useParams()
  const dispatch = useDispatch()
  const category = params?.categoryName
  const { categoryProducts, loading } = useSelector((state) => state.products)
  console.log("ct", categoryProducts);

  useEffect(() => {
    dispatch(categoryProduct(category))
  }, [dispatch])

  return (
    <div className=' container mx-auto p-4'>
      <div className=' sm:w-3/4 mx-auto bg-gray-100 rounded-lg shadow-md'>
        <h2 className='text-xl font-medium mb-4 my-3 p-2 ml-6 border-b  '>{`All ${params?.categoryName}s`}</h2>
        <div className='grid grid-cols-2 grid-rows-2 sm:grid-cols-4 gap-3 sm:mx-6'>

          {
            !loading && categoryProducts?.data?.map((product) => (
              <SearchProductCard key={product._id} product={product} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryProducts
