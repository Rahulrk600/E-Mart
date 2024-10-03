import React from 'react'
import { Input, Button } from '../index.js'
import { useForm } from 'react-hook-form'
import { MdOutlineEmail } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import {useDispatch,useSelector} from 'react-redux'
import { updateUserProfile } from '../../Store/Reducer/UserReducers/authSlice.js'
import {toast}from 'react-toastify'

function UpdateProfile() {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          fullName: user?.fullName || "",
          email: user?.email || "",
        },
    });

     const update_Profile = async(data) =>{
        try {
            const updateUser = await dispatch(updateUserProfile(data)).unwrap()
            toast.success("profile updated successfully")

        } catch (error) {
            toast.error(error)
        }
     }

    return (
        <div className='flex justify-center items-center max-h-screen  bg-slate-200 sm:mt-5'>
            <div className='w-full max-w-md  bg-white p-8 space-y-4  rounded-lg shadow-md sm:w-2/6'>
                <h2 className='text-2xl text-center font-bold text-gray-700 mb-6'>Update your account</h2>

                <form className='space-y-4' onSubmit={handleSubmit(update_Profile)} >

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

                    <div className=''>
                        <FaUserCircle className='text-gray-500 mr-2' />
                        <Input
                            className="px-3 py-1 mt-1"
                            label="FullName:"
                            placeholder=" Enter your Fullname "
                            {...register("fullName", {
                                required: 'Fullname is required',
                                minLength: {
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

export default UpdateProfile