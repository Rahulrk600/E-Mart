import React from 'react'
import { CiSquareRemove } from 'react-icons/ci'

function SortByCategoryForMobile({ isOpen, onClose, onSort,categorys }) {

    const handleSort =(category)=>{
        onSort(category);
        onClose();
    }

    if (!isOpen) return null;
    return (
        <div className='sm:hidden fixed bottom-0 right-0 w-full h-auto p-1 bg-blue-400  rounded-lg shadow-lg z-50 transform transition-all duration-300 ease-in-out'
            style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
        >
            <div className='flex justify-between border-b-2'>
                <h3 className=' p-2 text-sm font-bold text-black'>Sort By Categoty</h3>
                <p className=' block  text-black font-medium mr-4 ' onClick={() => onClose()}  >
                    <CiSquareRemove className='w-6  h-6' />
                </p>
            </div>
            <div className='px-4 '>
                <ul>
                    {
                        categorys.map((categoris) => (
                            <div key={categoris} className=' hover:text-red-400 ml-2'>
                                <li className=' capitalize tex' key={categoris} onClick={()=> handleSort(categoris)}>
                                    {categoris}
                                </li>
                            </div>

                        ))
                    }
                </ul>
            </div>

        </div>
    )
}

export default SortByCategoryForMobile
