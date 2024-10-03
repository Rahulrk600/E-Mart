import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, deleteUser, getAllUsers } from '../../Store/Reducer/UserReducers/authSlice'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'
import UpdateUserRole from './UpdateUserRole';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import { toast } from 'react-toastify';

function UserList() {

    const dispatch = useDispatch();
    const {users, loading, error} = useSelector((state)=> state.auth)
    const [currentPage, setCurrentPage] = useState(1)
    const userParPage = 10;
    const [isOpen, setIsOpen] = useState(false);
    const [selectUserId, setSelectUserId] = useState(null)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectUserEmail, setSelectUserEmail] = useState("")


    const openDelete = (userId, userEmail)=>{
        setSelectUserId(userId);
        setSelectUserEmail(userEmail);
        setIsDeleteOpen(true);
    }

    const closeDelete = ()=>{
        setIsDeleteOpen(false);
        setSelectUserId(null);
        setSelectUserEmail("")
    }

    const openPopup = (userId)=>{
        setSelectUserId(userId)
        setIsOpen(true)
    }

    const closePopup =()=>{
        setIsOpen(false)
        setSelectUserId(null)
    }

    const handleDeletUser =()=>{
        dispatch(deleteUser(selectUserId))
        console.log(selectUserId);
        
        closeDelete();   
    }
    

    useEffect(()=>{
       if(error){
        toast.error(error)
        dispatch(clearError())
       }

        dispatch(getAllUsers())
    },[dispatch, error, toast])

    const totalPages = Math.ceil(users.length / userParPage)

    const indexOfLastUser = currentPage * userParPage;
    const indexOfFirstUser = indexOfLastUser - userParPage;
    const currentUser = users?.data?.slice(indexOfFirstUser, indexOfLastUser);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


  return (
    <div className='w-full bg-white shadow-md rounded-md min-h-[calc(100vh-70px)]'>
            <h2 className='text-center font-bold p-4 text-xl border-b '>Users List</h2>
            <div className='grid grid-cols-5 place-items-center border-b p-2  shadow-md  '>

                <div className=''>
                    <p>User_Id</p>
                </div>

                <div>
                    <p>Name</p>
                </div>

                <div>
                    <p>Email</p>
                </div>

                <div>
                    <p>Role</p>
                </div>

                <div>
                    <p>Action</p>
                </div>
            </div>
            {
                !loading && currentUser?.map((user) => (
                    <div className='grid grid-cols-5 place-items-center  p-2 space-y-2 bg-slate-50 hover:bg-lime-100 '
                        key={user._id}
                    >

                        <div className='text-sm'>
                            <p>{user._id}</p>
                        </div>

                        <div className='text-sm'>
                            <p>{user.fullName}</p>
                        </div>

                        <div className='text-sm'>
                            <p>{user.email}</p>
                        </div>

                        <div className='text-sm'>
                            <p>{user.role}</p>
                        </div>

                        <div className='flex gap-8 text-xl'>
                           <MdModeEdit onClick={()=> openPopup(user._id)} className='text-green-500 hover:scale-125 transition-all' />
                            <MdDeleteForever onClick={()=> openDelete(user._id, user.email)} className='text-red-500 hover:scale-125 transition-all' />
                        </div>
                    </div>
                ))
            }
            <div className={`flex justify-end gap-20 items-center mt-10 mr-20 ${users.length > userParPage ? "block" : "hidden" } `}>
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className='border  border-gray-400 rounded-md bg-white shadow-md  px-1 
                     hover:bg-green-400 hover:text-white
                    '
                >
                    prev
                </button>

                {
                    Array.from({ length: totalPages }, (_,ind) => (
                        <button
                            key={ind + 1}
                            className={`${currentPage === ind + 1 ? "active" : ""} border  border-gray-400 rounded-md bg-white shadow-md  px-3  hover:bg-green-400 hover:text-white`}
                            onClick={()=> handlePageChange(ind + 1)}
                        >
                            {ind + 1}
                        </button>
                    ))  
                }
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className='border  border-gray-400 rounded-md bg-white shadow-md  px-1  hover:bg-green-400  hover:text-white'
                >
                    Next
                </button>
            </div>
            <UpdateUserRole
             isOpen={isOpen}
             onClose={closePopup}
             userId={selectUserId}
            />
            <DeleteConfirmationPopup
             isOpen={isDeleteOpen}
             onClose={closeDelete}
             onConfirm={handleDeletUser}
             ItemName={selectUserEmail}
            />
        </div>
  )
}

export default UserList
