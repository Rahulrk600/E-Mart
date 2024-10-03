import React, { useEffect } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { Input,Button } from '../../components/index.js'
import { useForm } from 'react-hook-form'
import { FaHome, FaCity,FaPhoneAlt} from 'react-icons/fa'
import { MdPublic,MdPinDrop, MdOutlineTransferWithinAStation } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { saveShippingDetails } from '../../Store/Reducer/shippingInfoSlice.js'

function ShippingDetails() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
 
  const onSubmit = (data)=>{
    dispatch(saveShippingDetails(data))
    navigate("/order/confirm")
    
  }

  return (
    <>
     <CheckoutSteps activeStep={1}/>
    <div className='flex justify-center items-center max-h-screen  bg-slate-200 '>
      <div className='w-full max-w-md h-fit bg-white p-4 space-y-2  rounded-lg shadow-md sm:w-2/6 '>
        <h2 className='text-xl sm:text-2xl text-center font-bold text-gray-700 mb-6'> Add Your Address</h2>
        <form className='space-y-2' onSubmit={handleSubmit(onSubmit)}>
          <div className=' relative'>
            <FaHome className='text-gray-500 mr-2 absolute ml-14 mt-1' />
            <Input
              className="px-3 py-1 mt-1"
              label="Address"
              placeholder=" Enter your Address "
              {...register("address", {
                required: 'Address is required',
              })}
            />
            {errors.address && (
              <p className='text-red-600 text-sm text-center'>
                {errors.address.message}
              </p>
            )}
          </div>

          <div className=' relative'>
            <FaCity className='text-gray-500 mr-2 absolute ml-8 mt-1' />
            <Input
              className="px-3 py-1 mt-1"
              label="City"
              placeholder=" Enter your City"
              {...register("city", {
                required: 'City is required',
              })}
            />
            {errors.city && (
              <p className='text-red-600 text-sm text-center'>
                {errors.city.message}
              </p>
            )}
          </div>

          <div className=' relative'>
            <MdOutlineTransferWithinAStation className='text-gray-500 mr-2 absolute ml-8 mt-1' />
            <Input
              className="px-3 py-1 mt-1"
              label="State"
              placeholder=" Enter your State "
              {...register("stat", {
                required: 'State is required',
              })}
            />
            {errors.states && (
              <p className='text-red-600 text-sm text-center'>
                {errors.states.message}
              </p>
            )}
          </div>
        
          <div className=' relative'>
            <MdPublic className='text-gray-500 mr-2 absolute ml-14 mt-1' />
            <Input
              className="px-3 py-1 mt-1"
              label="Country"
              placeholder=" Enter your Country "
              {...register("country", {
                required: 'Country is required',
              })}
            />
            {errors.country && (
              <p className='text-red-600 text-sm text-center'>
                {errors.country.message}
              </p>
            )}
          </div>

          <div className=' relative'>
            <MdPinDrop className='text-gray-500 mr-2 absolute ml-14 mt-1' />
            <Input
              className="px-3 py-1 mt-1"
              type="Number"
              label="Pincode"
              placeholder=" Enter your Pincode"
              {...register("pinCode", {
                required: 'Pincode is required',
              })}
            />
            {errors.pinCode && (
              <p className='text-red-600 text-sm text-center'>
                {errors.pinCode.message}
              </p>
            )}
          </div>

          <div className=' relative'>
            <FaPhoneAlt className='text-gray-500 mr-2 absolute ml-16 mt-1' />
            <Input
              className="px-3 py-1 mt-1"
              label="PhoneNo"
              type="Number"
              placeholder=" Enter your PhoneNo "
              {...register("phoneNo", {
                required: 'PhoneNo is required',
                minLength:{
                  value: 10,
                  message: 'PhoneNo must be at least 10 digit ',
                },
              })}
            />
            {errors.phoneNo && (
              <p className='text-red-600 text-sm text-center'>
                {errors.phoneNo.message}
              </p>
            )}
          </div>

          <div className='m-5 flex justify-center items-center'>
            <Button
              type='submit'
              childarn="Continue"
              classsName='bg-indigo-500 text-white py-2 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-indigo-00'
            />
          </div>
        </form>
      </div>
    </div>
  </>
  )
}

export default ShippingDetails

