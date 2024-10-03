import React from 'react'

function Button({
    childarn,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor='text-white',
    classsName= " " ,
    ...props
}) {
    return (
        <button className={` w-24 h-10 rounded-lg ${classsName} ${bgColor} ${textColor}`} {...props}>
            {childarn}
        </button>
    )
}

export default Button
