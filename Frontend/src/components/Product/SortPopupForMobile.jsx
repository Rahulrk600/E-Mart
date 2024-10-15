import React, { useState } from 'react'
import { CiSquareRemove } from 'react-icons/ci'

function SortPopupForMobile({ isOpen, onClose, onSort }) {


  if (!isOpen) return null;
  return (
    <div className='sm:hidden fixed bottom-0 right-0 w-full h-44 p-1 bg-blue-400  rounded-lg shadow-lg z-50 transform transition-all duration-300 ease-in-out'
      style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
    >
      <div className='flex justify-between border-b-2'>
        <h3 className=' p-2 text-sm font-bold text-black'>Sort By</h3>
        <p className=' block  text-black font-medium mr-4 ' onClick={() => onClose()}  >
          <CiSquareRemove className='w-6  h-6' />
        </p>
      </div>
      <div className='px-4 '>
        <button className=' block mb-2 text-black font-medium hover:text-red-500' onClick={() => { onSort('high-to-low'); onClose() }}>
          Price-- High to Low
        </button>

        <button className=' block mb-2 text-black font-medium hover:text-red-500' onClick={() => { onSort('low-to-high'); onClose() }}>
          Price-- Low to High
        </button>
        <button className=' block mb-2 text-black font-medium hover:text-red-500' onClick={() => { onSort('by-rating'); onClose() }}>
          By-Rating
        </button>

      </div>

    </div>
  )
}

export default SortPopupForMobile
