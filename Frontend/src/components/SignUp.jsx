import React, { useState } from 'react'
import { Button, Input } from './index.js'
import { useForm } from 'react-hook-form'
import { FaUserAlt, FaLock, FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import SignUpIcon from '../assets/signin.gif'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '../Store/Reducer/UserReducers/authSlice.js'
import {  toast } from 'react-toastify'


function SignUp() {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showPassword, setShowPassword] = useState("")
  const { error } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const registered = async (data) => {
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('avatar', data.avatar[0]);
      const res = await dispatch(userRegister(formData))
        .unwrap();
      toast.success(res.message)
      setTimeout(() => {
        if (res.success === true) {
          navigate("/")
        }
      }, 2000)

    } catch (err) {
      toast.error(error)
    }
  }

  return (
    <div className='flex justify-center items-center max-h-screen  bg-slate-200 sm:mt-10 '>
      <div className='w-full max-w-md h-fit bg-white p-8 space-y-2  rounded-lg shadow-md sm:w-2/6 '>
        <h2 className='text-2xl text-center font-bold text-gray-700 mb-6'>Sign Up to your account</h2>
        <form className='space-y-2' onSubmit={handleSubmit(registered)}>

          <div className=' w-12  mx-auto relative  overflow-hidden'>
            <img src={SignUpIcon} alt='signup icon' className='' />
          </div>

          <div className=''>
            <FaUserAlt className='text-gray-500 mr-2' />
            <Input
              className="px-3 py-1 mt-1"
              label="Username:"
              placeholder=" Enter your userName"
              {...register("username", {
                required: 'Username is required',
              })}
            />
            {errors.username && (
              <p className='text-red-600 text-sm text-center'>
                {errors.username.message}
              </p>
            )}
          </div>

          <div className=''>
            <FaUserCircle className='text-gray-500 mr-2' />
            <Input
              className="px-3 py-1 mt-1"
              label="FullName:"
              placeholder=" Enter your Fullname "
              {...register("fullName", {
                required: 'Fullname is required',
                minLength:{
                  value: 3,
                  message: 'Fullname must be at least 3 characters ',
                },

              })}
            />
            {errors.fullName && (
              <p className='text-red-600 text-sm text-center'>
                {errors.fullName.message}
              </p>
            )}
          </div>

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
              type={showPassword ? 'text' : 'password'}
              {...register("password", {
                required: 'Password is required',
                minLength:{
                  value: 5,
                  message: 'Password must be at least 5 characters ',
                },
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


          <div className=''>
            <FaLock className='text-gray-500 mr-2' />
            <Input
              className="px-3 py-1/2 mt-1"
              label="Avatar:"
              placeholder="choose your image"
              type="file"
              {...register("avatar", {
                required: 'Avatar is required',
              })}
            />
            {errors.avatar && (
              <p className='text-red-600 text-sm text-center'>
                {errors.avatar.message}
              </p>
            )}
          </div>



          <div className='m-5 flex justify-center items-center'>
            <Button
              type='submit'
              childarn="Sign up "
              classsName='bg-indigo-500 text-white py-2 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-indigo-00'
            />
          </div>
        </form>

        <p className='mt-2 text-center text-base text-black/60'>
          Allready you have a account?&nbsp;
          <Link to='/signin' className='font-medium text-red-600 transition-all duration-200 hover:underline'>Sign In</Link>
        </p>

      </div>
    </div>
  )
}

export default SignUp
