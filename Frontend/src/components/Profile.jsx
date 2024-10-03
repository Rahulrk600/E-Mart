import React from 'react'
import { Button } from './index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Profile() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  return (
    <div className=' w-full max-h-screen bg-white font-serif p-8 '>
      <h1 className='text-2xl text-center'>My Profile</h1>
      <div className='flex items-center justify-center flex-col sm:flex-row sm:mt-8'>
        <div className='w-fit mb-20'>
          <div >
            <img src={user?.avatar} alt={user?.fullName} className=' rounded-full text-white  w-20 h-20 mt-16 sm:w-40 sm:h-40' />
          </div>
          <Link className='text-blue-400 text-sm  hover:underline cursor-pointer sm:ml-10'>Update Profile</Link>
        </div>

        <div className='bg-white shadow-md mt-4 p-2 w-fit sm:ml-60' >
          <div className='flex gap-20'>
            <h4>Full-Name:-</h4>
            <p>{user?.fullName}</p>
          </div>

          <div className='flex gap-20 m-3'>
            <h4>Email:-</h4>
            <p>{user?.email}</p>
          </div>

          <div className='flex  gap-20'>
            <h4>Joined_On:-</h4>
            <p>{String(user?.createdAt).substring(0, 10)}</p>
          </div>


          <div className=' flex  items-center justify-start flex-col mt-16 gap-4 text-sm' >
            <Link to="/updateProfile">
              <Button
                childarn={"Update Profile"}
                classsName='w-52'
              />
            </Link>
            <Link to="/updatePassword">
              <Button
                childarn={"Change Password"}
                classsName='w-52'
              />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile
