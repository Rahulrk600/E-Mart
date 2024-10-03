import React from 'react'
import ReactStars from 'react-stars'


function ReviewCard({reveiw}) {
    const options = {
    edit: false,
    color: "rgba(20,20,20.0.1)",
        activeColor: "yellow",
        size: window.innerWidth < 650 ? 16 : 21,
        isHalf: true,
        value: reveiw?.ratings        
    };
    

    return (
        <div className='bg-white p-6 rounded-lg shadow-md max-w-xs mx-auto mb-4'>
            <div className='flex items-center justify-between mb-4'>
                    <div className=' flex flex-col'>
                        <img
                            src={reveiw?.avatar}
                            alt={reveiw?.fullName}
                            className=' object-cover w-10 h-10 bg-gray-200 rounded-full overflow-hidden'
                        />
                        <h4 className='text-sm font-semibold mt-1 '>{reveiw?.fullName}</h4>
                    </div>
                    <div className='ml-4'>
                        <ReactStars {...options}/>
                        <p className='text-base text-gray-600 leading-relaxed'>{reveiw?.comment}</p>
                    </div> 
            </div>
        </div>

    )
}

export default ReviewCard
