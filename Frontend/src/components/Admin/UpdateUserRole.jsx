import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateUserRole } from '../../Store/Reducer/UserReducers/authSlice';

function UpdateUserRole({isOpen, onClose, userId}) {
    const [role, setRole] = useState('')
    const dispatch = useDispatch();
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        dispatch(updateUserRole({userId,role}))
        window.location.href='/admin/usersList'
        onClose()
    };
    

    if(!isOpen) return null;

  return (
    <div className=' fixed inset-0 bg-gray-400 bg-opacity-50 z-50 flex items-center justify-center'>
        <div className='bg-white p-4 rounded-md w-1/4'>
           <h3 className='font-medium mb-4 text-center'> Update User Role</h3>
           <form onSubmit={handleSubmit}>
            <label className='block mb-2'>Select Role</label>
            <select
             value={role}
             onChange={(e)=> setRole(e.target.value)}
             className='w-full p-2 border rounded-md mb-4'
            >
                <option value="" disabled>Select Role</option>
                <option value='user'>user</option>
                <option value='admin'>admin</option>
            </select>
            <div className='flex justify-end'>
                <button className='px-4 py-1 bg-black rounded-md mr-2 text-red-500'
                 onClick={onClose}
                >cancel</button>
                <button className='px-4 py-1 bg-black rounded-md mr-2 text-green-500'
                  type='submit'
                  
                >Update</button>
            </div>
           </form>
        </div>
      
    </div>
  )
}

export default UpdateUserRole
