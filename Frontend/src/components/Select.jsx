import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=""></label>}
        <Select
         {...props}
         id={id}
          ref={ref}
          className={`rounded-md ${className}`}
        >
         {options?.map((option) => (
            <option key={option} value={option}>
                {options}
            </option>
         ))}
        </Select>
    </div>
  )
}

export default React.forwardRef(Select)
