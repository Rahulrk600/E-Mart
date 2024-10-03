import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FaShoppingCart } from 'react-icons/fa'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { currentUser, logoutUser} from '../Store/Reducer/UserReducers/authSlice'
import { toast } from 'react-toastify'

const Header = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate()
    const {cartItems} = useSelector((state)=> state.cart)
    const {isAuthenticated, user, error } = useSelector((state) => state.auth)
    //const [keyword, setKeyword] = useState()
    

    const handleLogout = () => {
       if(isAuthenticated){
        dispatch(logoutUser());
        toast.success("Logout Successfully")
        navigate("/signin")
       }
    }

    useEffect(()=>{
        if(error){
            toast.error(error)
        }
    },[error])
    
    const handleSearch = (e)=>{
        e.preventDefault()
        const {value} = e.target
        if(value){
            navigate(`/search?q=${value}`)
        }else{
           navigate('/search')
        }
    }

    return (
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
                    <div  className=' cursor-pointer text-2xl -mt-[185px] -mr-[8rem] sm:mt-0 sm:-mr-16 sm:text-3xl'>
                        { user ? (
                            <img
                             src={user.avatar}
                             alt={user.fullName}
                             className='sm:w-10 sm:h-10 w-9 h-9 rounded-full'
                             />
                        ):
                    (
                        <FaRegCircleUser />
                    )}  
                    </div>
                    <div className=' absolute  -top-[4.5rem] sm:top-11 -right-[6.5rem] sm:-right-[4.5rem] bg-gray-100 p-1 shadow-md rounded  hidden group-hover:block '>
                      <nav className='flex flex-col justify-center items-center text-sm font-medium'>
                        {
                            user && user?.role === 'admin'&&(
                                <Link to={'/admin/dashbord'} className=' whitespace-nowrap mt-2  hover:bg-white p-1 w-full'>Dashbord</Link>
                            )
                        }
                        <Link to={'/profile'} className=' whitespace-nowrap mt-2 hover:bg-white p-1'>My Account</Link>
                        <Link to={'/orders'} className='  mt-2  hover:bg-white p-1 w-full text-center'>Orders</Link>
                      </nav>
                    </div>
                    </div>
                   
                    <div className=' cursor-pointer text-2xl absolute top-[13px] right-[100px] sm:text-3xl'>
                        <div className='relatived'>
                            <Link to={"/cart"}><FaShoppingCart /></Link>
                            <div className='bg-red-500 text-white  w-4 h-4 sm:w-5 sm:h-5  p-1 flex justify-center items-center rounded-full absolute -top-1 -right-3'>
                                <p className='text-xs'>{cartItems?.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className='  '>
                        {
                            user ? (
                                <button
                                    onClick={handleLogout}
                                    className=' text-black bg-cyan-300 border border-red-400 rounded-xl hover:bg-green-400 cursor-pointer px-1 sm:px-2 sm:py-1 absolute top-[3px] right-[7px]  my-2 mx-2 '
                                >
                                    Logout
                                </button>
                            )
                                :
                                (
                                    <Link
                                        to="/signin"
                                        className=' text-black bg-cyan-300 border border-red-400 rounded-xl   hover:bg-green-400 cursor-pointer px-1 sm:px-2 sm:py-1 absolute top-[3px] right-[18px]  my-2 mx-2  '>Login</Link>

                                )
                        }

                    </div>
                </div>
                <div className='h-0 '>
                    <div className=' text-2xl sm:hidden absolute top-[13px]  left-[18px]'>
                        <RxHamburgerMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
