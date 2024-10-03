import React from 'react'

function DeleteConfirmationPopup({isOpen , onClose, onConfirm,ItemName}) {

    if(!isOpen) return null;
  return (
    <div  className=' fixed inset-0 bg-gray-400 bg-opacity-50 z-50 flex items-center justify-center'>
      <div className='bg-white p-4 rounded-md w-1/4'>
      <h3 className='font-medium mb-4 text-center'>Confirm Deletion</h3>
      <p className='mb-4 text-sm  text-center'>Are you sure you want to delete this {ItemName} id user</p>

       <div className='flex justify-center'>
        <button className='px-4 py-1 bg-black rounded-md mr-2 text-green-500' onClick={onClose}>cancel</button>
        <button className='px-4 py-1 bg-black rounded-md mr-2 text-red-500'onClick={onConfirm} >Delete</button>
       </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationPopup
