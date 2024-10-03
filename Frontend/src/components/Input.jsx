import React,{useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type="text",
    className="",
    ...props
}, ref){
    const id= useId()
    return(
        <div className='w-full'>
           {label && <label className=' block font-medium text-gray-700 text-sm ' htmlFor={id}>
            {label}
            </label>
            }
            <input
             type={type}
             className={`w-full  border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 ${className}`}
             ref={ref}
             {...props}
             id={id}
            />
        </div>
    )
})

export default Input
