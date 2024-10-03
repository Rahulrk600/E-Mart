import React from 'react'
import { MdSpellcheck,MdDescription,MdOutlineCategory } from 'react-icons/md'
import {RiMoneyDollarBoxLine} from 'react-icons/ri'
import {FaRegImage} from 'react-icons/fa'
import { Button, Input } from '../index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { createProducts } from '../../Store/Reducer/productSlice'

function NewProduct() {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset} = useForm()

  const SubmitData =  (data)=>{
    const formData = new FormData();
    for (const key in data) {
      if(key === 'images'){
         Array.from(data[key]).forEach(file => formData.append('images',file))
      } else{
        formData.append(key, data[key]);
      }
    }
    dispatch(createProducts(formData))
    .unwrap()
    .then(()=>{
      toast.success("product created Successfully")
      reset();
    })
    .catch((err)=>{
      toast.error(err.message || "Failed created product ")
    })
    
  }

  return (
    <div className='flex justify-center items-center max-h-screen  bg-slate-200 '>
      <div className='w-full max-w-md  bg-white p-8   rounded-lg shadow-md sm:w-2/4'>
        <h2 className='text-2xl text-center font-bold text-gray-700 mb-3'>Add New Product </h2>

        <form className='space-y-2' onSubmit={handleSubmit(SubmitData)} >

          <div className=''>
            <MdSpellcheck className='text-gray-500 mr-2' />
            <Input
              className="px-3  mt-1"
              label="Product Name:"
              placeholder=" Enter product name "
              {...register("name", {
                required: true,
                })}
            />
          </div>

          <div className=''>
            <RiMoneyDollarBoxLine className='text-gray-500 mr-2' />
            <Input
              className="px-3  mt-1"
              type="Number"
              label="Product Price:"
              placeholder=" Enter product price "
              {...register("price", {
                required: true
                })}
            />
  
          </div>

          <div className=''>
            <MdDescription className='text-gray-500 mr-2' />
            <Input
              className="px-3  mt-1"
              label="Product Description:"
              placeholder=" Enter product description "
              {...register("description", {
                required: true
                })}
            />
          </div>

          <div className=''>
            <MdOutlineCategory className='text-gray-500 mr-2' />
            <Input
              className="px-3  mt-1"
              label="Product Categoris:"
              placeholder=" Enter product name "
              {...register("category", {
                required: true
                })}
            />
            
          </div>

          <div className=''>
            <FaRegImage className='text-gray-500 mr-2' />
            <Input
              className="px-3  mt-1 "
              type="file"
              label="Product Images:"
              placeholder=" Enter product images "
              multiple
              {...register('images',{
                required: true
              })}
            />
          </div>

          <div className='m-5 flex justify-center items-center'>
            <Button
              type='submit'
              childarn={"Add Product"}
              classsName='bg-indigo-500 text-white py-2 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-indigo-00'
            />
            
          </div>
        </form>

      </div>
    </div>
  )
}

export default NewProduct
