import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function DashbordLayout() {
  return (
    <div  className='min-h-[calc(100vh-70px)] flex'>
         <Sidebar/>
         <div className='w-full'>
         <Outlet/>
         </div>
      
    </div>
  )
}

export default DashbordLayout
