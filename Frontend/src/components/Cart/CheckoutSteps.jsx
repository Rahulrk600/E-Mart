import React from 'react'
import {FaShippingFast,FaClipboardCheck, FaCreditCard} from 'react-icons/fa'

function CheckoutSteps({activeStep}) {
    const steps = [
        {
            label: 'Address', icon:<FaShippingFast size={24}/>
        },
        {
            label: 'Confirm Order', icon:<FaClipboardCheck size={24}/>
        },
        {
            label: 'Payment', icon:<FaCreditCard size={24}/>
        },
    ]
  return (
    <div className='flex justify-between mx-auto max-w-2xl items-center p-4'>
      {
        steps.map((step, index)=>(
            <div key={index} className='flex-1 items-center'>
                <div 
                className={` flex, items-center justify-center mx-auto w-6 h-6 rounded-full
                    ${activeStep === index + 1 ? 'text-blue-700' : ' bg-white text-gray-500'}`}
                >
                 {step.icon}  
                  
                </div>
                {index <= steps.length - 1 &&(
                   <div  className={`h-1 mx-auto ${activeStep > index + 1 ? 'bg-blue-500' : 'bg-white'}`}>
                   </div>
                )}
                <span className={` ml-9 sm:ml-20 mt-1 text-sm font-semibold ${activeStep === index + 1 ? 'text-green-500': 'text-gray-500'}`}>
                  {step.label}
                </span>
                
                
            </div>
        ))
      }
    </div>
  )
}

export default CheckoutSteps
