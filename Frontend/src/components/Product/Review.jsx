import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createReview,resetReview } from '../../Store/Reducer/reviewSlice'
import {toast} from 'react-toastify'

function Review({ isOpen, onClose, productId }) {
    const dispatch = useDispatch()
    const { error, success} = useSelector((state)=> state.review)
    const [ratings, setRating] = useState()
    const [comment, setComment] = useState("")

    const hendalSubmit = () => {
      dispatch(createReview({
        ratings,comment,productId
      }))
         onClose();
    }

    useEffect(()=>{
       if(success){
        toast.success('submit review successfully')
        dispatch(resetReview());
        setRating()
        setComment("")
       }

       if(error){
        toast.error(error)
       }
    },[success,error,dispatch,])

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-2 sm:p-4 rounded-lg w-full max-w-md sm:mx-auto'>
                <h2 className=' text-xl sm:text-2xl font-semibold mb-4'>Submit your Review</h2>

                <div className='mb-3'>
                    <label className='block text-sm mb-2'>Rating</label>
                    <input
                        type='number'
                        min="1"
                        max="5"
                        className='w-full p-2 border rounded'
                        value={ratings}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label className='block text-sm mb-2'>Comment</label>
                    <textarea
                        className='w-full p-2 border rounded resize-none'
                        rows="2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    >

                    </textarea>
                </div>

                <div className='flex justify-end space-x-2'>
                    <button onClick={onClose} on className='text-red-500 border border-red-500 font-medium rounded px-2 sm:px-3 py-1 hover:bg-black'>Cancel</button>
                    <button onClick={hendalSubmit} className=' hover:bg-black text-green-500 font-medium border border-green-500 rounded px-2 py:3 py-1 '>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Review
