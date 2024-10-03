import React, { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { MdSpellcheck,MdDescription,MdOutlineCategory } from 'react-icons/md'
import {RiMoneyDollarBoxLine} from 'react-icons/ri'
import {AiOutlineStock} from 'react-icons/ai'
import { Button, Input } from '../index'
import { useForm } from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux'
import { updateProduct,getProductDetails,clearError } from '../../Store/Reducer/productSlice'
import { toast } from 'react-toastify'


function UpdatePrduct() {
    const {id} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {product, loading, error} = useSelector((state)=> state.products)

    //console.log("pro",product);
    
    
    const { register, handleSubmit, reset} = useForm()

    useEffect(()=>{
         dispatch(getProductDetails(id))

         if(error){
            toast.error(error)
            dispatch(clearError())
         }
        
     },[dispatch,id])
     

    useEffect(()=>{
       if(product && product._id === id){
        reset({
            name: product?.name,
            description: product?.description,
            price: product?.price,
            stock: product?.stock,
            category:product?.category
        })
       }

    },[product,reset])
    
    const SubmitData =  (data)=>{
      dispatch(updateProduct({id, productData:data}))
      .unwrap()
      .then(()=>{
        toast.success("Product updated successfully")
        navigate('/admin/productsList')
      })
      .catch((error)=>{
        toast.error('update failed', error)
      });
    };
  
    return (
      <div className='flex justify-center items-center max-h-screen  bg-slate-200 '>
        <div className='w-full max-w-md  bg-white p-4   rounded-lg shadow-md sm:w-2/4'>
          <h2 className='text-2xl text-center font-bold text-gray-700 mb-1'>Update Product </h2>
  
          <form className='spacemy-1' onSubmit={handleSubmit(SubmitData)} >
  
            <div className=''>
              <MdSpellcheck className='text-gray-500 mr-2' />
              <Input
                className="px-3 my-1"
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
                className="px-3 my-1"
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
                className="px-3 my-1"
                label="Product Description:"
                placeholder=" Enter product description "
                {...register("description", {
                  required: true
                  })}
              />
            </div>

            <div className=''>
              <AiOutlineStock className='text-gray-500 mr-2' />
              <Input
                className="px-3 my-1"
                type="Number"
                label="Product Stock:"
                placeholder=" Enter product Stock "
                {...register("stock", {
                  required: true
                  })}
              />
    
            </div>
  
            <div className=''>
              <MdOutlineCategory className='text-gray-500 mr-2' />
              <Input
                className="px-3 my-1"
                label="Product Categoris:"
                placeholder=" Enter product name "
                {...register("category", {
                  required: true
                  })}
              />
              
            </div>
  
            <div className='m-5 flex justify-center items-center'>
              <Button
                type='submit'
                childarn={"Update"}
                classsName='bg-indigo-500 text-white py-2 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-indigo-00'
              />
              
            </div>
          </form>
  
        </div>
      </div> 
   )
}

export default UpdatePrduct
