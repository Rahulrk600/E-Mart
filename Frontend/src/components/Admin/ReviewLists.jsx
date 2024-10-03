import React, { useEffect, useState } from 'react'
import { Input, Button } from '../index'
import {MdDeleteForever} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReview, clearError } from '../../Store/Reducer/reviewSlice'
import { toast } from 'react-toastify'

function ReviewLists() {
  const [productId, setProductId] = useState("")
  const dispatch = useDispatch();
  const { error, reviews, loading } = useSelector((state) => state.review);

  console.log(reviews);


  useEffect(() => {
    if (productId) {
      dispatch(getAllReview(productId))
    }
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [dispatch, error])

  const handalSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllReview(productId));
  }


  return (
    <div className='w-full rounded-md min-h-[calc(100vh-70px)] bg-white shadow-md'>
      <h2 className='text-center p-4 text-xl font-medium border-b'>Review List</h2>
      <form onSubmit={handalSubmit}>
        <div className='text-center'>
          <Input
            className='w-64 p-2 mb-2 mt-6 border border-black bg-slate-200'
            placeholder="Product Id"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <Button
            type='submit'
            childarn={"Search"}
            classsName='mt-1 hover:bg-green-500'
          />
        </div>
      </form>
      { !loading && reviews.length !== 0 ?(
        <div className='grid grid-cols-5 place-items-center border-b p-2  shadow-md bg-white mt-8 '>

        <div className=''>
          <p>Review_Id</p>
        </div>

        <div>
          <p>User</p>
        </div>

        <div>
          <p>Comment</p>
        </div>

        <div>
          <p>Rating</p>
        </div>

        <div>
          <p>Action</p>
        </div>
      </div>
      ):(
        <p className='text-red-400 text-center text-xl font-bold mt-6 p-2'>No Reviews Found</p>
      )
      }
      {
        !loading && reviews.reviews?.map((review) => (
          <div className='grid grid-cols-5 place-items-center  p-2 space-y-2 bg-slate-50 hover:bg-lime-100 '
            key={review._id}
          >

            <div className='text-sm'>
              <p>{review._id}</p>
            </div>

            <div className='text-sm'>
              <p>{review.fullName}</p>
            </div>

            <div className='text-sm'>
              <p>{review.comment}</p>
            </div>

            <div className='text-sm'>
              <p>{review.ratings}</p>
            </div>

            <div className='flex gap-8 text-xl'>
              <MdDeleteForever className='text-red-500 hover:scale-125 transition-all' />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ReviewLists
