import React, { useEffect } from 'react'
import { useNavigate, Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'

function ProtectedRoute({isAdmin, children, isAuthenticated}) {

    //const {isAuthenticated, user} = useSelector((state)=> state.auth)
    const navigate = useNavigate()
    
    if(!isAuthenticated){
       return navigate("/signin")
    }
  return children;
}

export default ProtectedRoute
