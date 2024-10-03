import React from 'react'
import {Link} from 'react-router-dom'
//import {useSelector} from 'react-redux'


function Verticaly_card({ product }) {

  // const {categories} = useSelector((state)=> state.products)
  // console.log(useSelector((state) => state.products));


  return (
    <Link to={`product/${product._id}`} className='group p-[2px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200'>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden group-hover:bg-gradient-to-br  group-hover:from-red-50 group-hover:via-purple-50 hover:to-yellow-50'>
        <img src={product?.images[0]} alt={product.category} className='w-full h-36 object-scale-down hover: scale-100 transition-all' />
        <div className='p-2 mt-1 text-center'>
          <h3 className='text-lg sm:text-base font-medium '>{product.name}</h3>
          <p className='text-lg sm:text-base font-medium '>₹{product.price}</p>
        </div>

      </div>
    </Link>
  )
}

export default Verticaly_card
//    <div className=' container mx-auto h-52 w-48 group overflow-hidden rounded-2xl p-[2px] bg-slate-200 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200'>
//             <div className='  bg-white  group-hover:bg-gradient-to-br  group-hover:from-red-50 group-hover:via-purple-50 hover:to-yellow-50'>
//                 {
//                   categories?.map((product, index)=>{
//                     return (
//                         <div className=' shadow-md p-1 rounded-lg' key={product?._id}>
//                     <img
//                         src={product?.images[0]}
//                         alt={product?.category}
//                         className='w-full  object-scale-down h-36 rounded-lg'
//                     />
//                     <div className='mt-1 text-center'>
//                         <h3 className=' text-lg sm:text-base font-medium '>{product?.name}</h3>
//                         <p className='text-gray-600'>₹{product.price}</p>
//                     </div>
//                 </div>
//                     )
//                   })
//                 }
//             </div>
//         </div>
