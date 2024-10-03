import React from 'react'
import {Link} from 'react-router-dom'
import ReactStars from 'react-stars'


function SearchProductCard({ product }) {
 
    const options = {
        edit: false,
        color: "rgba(20,20,20.0.1)",
        activeColor: "yellow",
        size: window.innerWidth < 650 ? 16 : 21,
        isHalf: true,
        value: product?.ratings
        
    };

  return (
    <Link to={`/product/${product?._id}`} className='group p-[2px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200'>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden group-hover:bg-gradient-to-br  group-hover:from-red-50 group-hover:via-purple-50 hover:to-yellow-50'>
        <img src={product?.images[0]} alt={product?.category} className='w-full h-36 object-scale-down hover: scale-100 transition-all' />
        <div className='p-2 mt-1 text-center'>
          <h3 className='text-lg sm:text-base font-medium '>{product?.name}</h3>
          <p className='text-lg sm:text-base font-medium ml-14'>{<ReactStars {...options} />}</p>
          <p className='text-lg sm:text-base font-medium '>₹{product?.price}</p>
        </div>

      </div>
    </Link>
  )
}

export default SearchProductCard