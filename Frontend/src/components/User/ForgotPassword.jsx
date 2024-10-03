import React from 'react'
import {Input, Button} from '../index.js'
import {useForm} from 'react-hook-form'
function ForgotPassword() {

  const {register,handleSubmit} = useForm()

  return (
    <div className='mx-auto max-w-md bg-white shadow-md  rounded-lg p-4 mt-8 sm:mt-2'>
      <div className='text-center'>
        <h2 className='font-medium text-xl'>Forgot Password</h2>
        <form>
        <div className='flex flex-col justify-center items-center p-6'>
        <Input
              className="px-3 py-1 mt-1 mb-4"
              label="Email"
              placeholder=" Enter your email "
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be vaild address",
                }
              })}
            />
            <Button
            type='submit'
            childarn={"Submit"}
             classsName='bg-indigo-500 text-white py-2 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-indigo-00'
            />
        </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
