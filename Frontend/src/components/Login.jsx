import React, { useState } from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { Button, Input } from './index.js'
import { useForm } from 'react-hook-form'
import { MdOutlineEmail } from 'react-icons/md'
import { FaLock, FaEyeSlash, FaEye } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../Store/Reducer/UserReducers/authSlice.js'
import { toast } from 'react-toastify'

function Login() {
  const { register, handleSubmit, formState:{errors} } = useForm()
  const [showPassword, setShowPassword] = useState("")
  const dispatch = useDispatch()
  //const navigate = useNavigate()
  //const location =useLocation()

 // const redirect = location.search ? location.search.split("=")[1] : "/";

  
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const loginuser = async (data) => {
    try {
       const res = await dispatch(loginUser(data))
      .unwrap()
      toast.success(res.message)  
      if(res.success === true){
        window.location.href='/'
      }
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div className='flex justify-center items-center max-h-screen  bg-slate-200 sm:mt-5'>
      <div className='w-full max-w-md  bg-white p-8 space-y-4  rounded-lg shadow-md sm:w-2/6'>
        <h2 className='text-2xl text-center font-bold text-gray-700 mb-6'>Sign In to your account</h2>

        <form className='space-y-4' onSubmit={handleSubmit(loginuser)} >

          <div className=''>
            <MdOutlineEmail className='text-gray-500 mr-2' />
            <Input
              className="px-3 py-1 mt-1"
              label="Email:"
              placeholder=" Enter your email "
              type="email"
              {...register("email", {
                required: 'Email is required',
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be vaild address",
                }
              })}
            />
            {errors.email && (
              <p className='text-red-600 text-sm text-center'>
              {errors.email.message}
            </p>
            )}

          </div>

          <div className=' relative'>
            <FaLock className='text-gray-500 mr-2' />
            <Input
              className="px-3 py-1 mt-1"
              label="Password:"
              placeholder=" Enter your password "
              type={showPassword ? 'text' : "password"}
              {...register("password", {
                required: 'Password is required',
              })}
            />
            <span
              onClick={togglePasswordVisibility}
              className=' absolute right-2 top-14 cursor-pointer'>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

            {errors.password && (
               <p className='text-red-600 text-sm text-center'>
              {errors.password.message}
            </p>
            )}

          </div>

          <div className='text-red-500 font-bold  hover:underline flex items-end  justify-end'>
            <Link to="/password/forgot">
              Forgot Password
            </Link>
          </div>

          <div className='m-5 flex justify-center items-center'>
            <Button
              type='submit'
              childarn={"Sign In"}
              classsName='bg-indigo-500 text-white py-2 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-indigo-00'
            />
            
          </div>
        </form>

        <p className='mt-2 text-center text-base text-black/60'>
          Don&apos;t have any account?&nbsp;
          <Link to='/signup' className='font-medium text-red-600 transition-all duration-200 hover:underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
