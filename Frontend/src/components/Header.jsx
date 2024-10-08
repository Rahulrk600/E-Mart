import React, { useEffect, useState, useRef } from 'react'
import { Link, NavLink, useNavigate  } from 'react-router-dom'
import { CiSearch, CiLogout } from 'react-icons/ci'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { RxHamburgerMenu } from 'react-icons/rx'
import { HiBriefcase } from 'react-icons/hi'
import { MdFavorite, MdCategory, MdLanguage,MdLogin } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser, logoutUser } from '../Store/Reducer/UserReducers/authSlice'
import { toast } from 'react-toastify'

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const sidebarRef = useRef(null)
    const { cartItems } = useSelector((state) => state.cart)
    const { isAuthenticated, user, error } = useSelector((state) => state.auth)
    const [sidebar, setSidebar] = useState(false)


    const handalHambargarClick = () => {
        setSidebar(!sidebar)
    }

    const outSideClick = (e)=>{
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
          setSidebar(false);
        }
       } 

    const handaleItemClick  =()=>{
        setSidebar(false)
    }  
        
      useEffect(()=>{
        if(sidebar){
         document.addEventListener('mousedown', outSideClick) 
        }else{
            document.removeEventListener('mousedown',outSideClick)
        }
         return ()=>{
          document.removeEventListener('mousedown', outSideClick)
         }
      },[sidebar]);  
    

    const handleLogout = () => {
        if (isAuthenticated) {
            dispatch(logoutUser());
            toast.success("Logout Successfully")
            navigate("/signin")
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    const handleSearch = (e) => {
        e.preventDefault()
        const { value } = e.target
        if (value) {
            navigate(`/search?q=${value}`)
        } else {
            navigate('/search')
        }
    }

    return (
        <>
            <header className=' sticky top-0 z-50 bg-white h-32 shadow-sm md:h-16 sm:shadow-md '>
                <div className=' container mx-auto flex  flex-col justify-between items-center sm:flex-row'>

                    <div className='mr-36 my-1 sm:mx-8'>
                        <Link to="/">   <h1 className=' text-3xl text-red-600 font-bold'>E-<span className=' text-green-600 '>mart</span></h1></Link>
                    </div>
                    <div className='p-[10px] mt-[30px] flex  items-center relative shadow-sm sm:focus-within:shadow bg-gray-300 rounded-lg w-[88%] sm:w-2/5 sm:mt-[10px]' >
                        <div className='absolute text-sm sm:text-2xl '>

                            <CiSearch />
                        </div>
                        <input
                            type='text'
                            className='w-full text-center outline-none bg-gray-300 '
                            placeholder='Search the products...'
                            onChange={handleSearch}
                        />
                    </div>

                    <div className=' flex justify-center items-center'>
                        <div className=' group flex  justify-center items-center flex-col relative '>
                            <div className=' cursor-pointer text-2xl -mt-[185px] -mr-[8rem] sm:mt-0 sm:-mr-16 sm:text-3xl'>
                                {user ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.fullName}
                                        className='sm:w-10 sm:h-10 w-9 h-9 rounded-full'
                                    />
                                ) :
                                    (
                                        <FaRegCircleUser />
                                    )}
                            </div>
                            <div className=' absolute  -top-[4.5rem] sm:top-11 -right-[6.5rem] sm:-right-[4.5rem] bg-gray-100 p-1 shadow-md rounded  hidden group-hover:block '>
                                <nav className='flex flex-col justify-center items-center text-sm font-medium'>
                                    {
                                        user && user?.role === 'admin' && (
                                            <Link to={'/admin/dashbord'} className=' whitespace-nowrap mt-2  hover:bg-white p-1 w-full'>Dashbord</Link>
                                        )
                                    }
                                    <Link to={'/profile'} className=' whitespace-nowrap mt-2 hover:bg-white p-1'>My Account</Link>
                                    <Link to={'/orders'} className='  mt-2  hover:bg-white p-1 w-full text-center'>Orders</Link>
                                </nav>
                            </div>
                        </div>

                        <div className=' cursor-pointer text-2xl absolute top-[13px] right-[60px] sm:right-[120px] sm:text-3xl'>
                            <div className='relatived'>
                                <Link to={"/cart"}><FaShoppingCart /></Link>
                                <div className='bg-red-500 text-white  w-4 h-4 sm:w-5 sm:h-5  p-1 flex justify-center items-center rounded-full absolute -top-1 -right-3'>
                                    <p className='text-xs'>{cartItems?.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className=' hidden sm:block'>
                            {
                                user ? (
                                    <button
                                        onClick={handleLogout}
                                        className=' text-black bg-cyan-300 border border-red-400 rounded-xl hover:bg-green-400 cursor-pointer px-1 sm:px-2 sm:py-1 absolute top-[3px] right-[0px] sm:right-[7px] my-2 mx-2 '
                                    >
                                        Logout
                                    </button>
                                )
                                    :
                                    (
                                        <Link
                                            to="/signin"
                                            className=' text-black bg-cyan-300 border border-red-400 rounded-xl   hover:bg-green-400 cursor-pointer px-1 sm:px-2 sm:py-1 absolute top-[3px] right-[1px]   my-2 mx-2  '>Login</Link>

                                    )
                            }
                        </div>
                    </div>
                    <div className='h-0 '>
                        <div className=' text-2xl sm:hidden absolute top-[13px]  left-[18px]'>
                            <RxHamburgerMenu onClick={handalHambargarClick} />
                        </div>
                    </div>
                </div>
            </header>
            {/** sidebar for mobile */}
            <div ref={sidebarRef} className={`sm:hidden fixed top-0 left-0 w-64 h-full bg-gray-800 text-slate-100 z-50 transition-transform transform ${sidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='flex justify-center items-center bg-blue-400 p-4 shadow-md'>
                    <FaRegCircleUser className='w-6 h-6 mr-14' />
                    <h1 className=' text-2xl text-red-600 font-medium'>E-<span className=' text-green-700 '>mart</span></h1>
                </div>
                <nav className='text-sm font-medium mt-4 '>
                    <ul className=' border-b border-gray-600 py-3' onClick={handaleItemClick}>
                        <NavLink className='flex items-center gap-3 px-2 mb-2'>
                            <MdCategory className='w-4 h-4' /> All Category
                        </NavLink>
                        <li>
                            <NavLink className='flex items-center gap-3 px-2 mb-2'>
                                <MdLanguage className='w-4 h-4' /> Choose Language
                            </NavLink>
                        </li>
                    </ul>

                    <ul className=' border-b border-gray-600 py-3' onClick={handaleItemClick}>
                        <li>
                            <NavLink className='flex items-center gap-3 px-2 mb-2'>
                                <HiBriefcase className='w-4 h-4' /> My Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex items-center gap-3 px-2 mb-2'>
                                <FaShoppingCart className='w-4 h-4' /> My Cart
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex items-center gap-3 px-2 mb-2'>
                                <MdFavorite className='w-4 h-4' /> My Wishlist
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='flex items-center gap-3 px-2 mb-2'>
                                <FaUser className='w-4 h-4' /> My Account
                            </NavLink>
                        </li>
                    </ul>
                    <div className='border-b border-gray-600 py-3' onClick={handaleItemClick}>
                        {
                            user ? (
                                <p
                                    onClick={handleLogout}
                                    className='flex items-center gap-3 px-2 mb-2' >
                                   <CiLogout/> Logout
                                </p>
                            ) :
                                (
                                    <NavLink
                                        to="/signin"
                                        className='flex items-center gap-3 px-2 mb-2'>
                                            <MdLogin/>Login
                                    </NavLink>
                                )
                        }
                    </div>
                    <p className='border-b border-gray-600 py-3 px-2 mb-2'>
                      Help Center
                    </p>
                </nav>
            </div>
        </>
    )
}

export default Header
