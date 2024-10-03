import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersByAdmin , deleteOrder, clearError} from '../../Store/Reducer/orderSlice'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function OrdersList() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { orders, loading,error} = useSelector((state) => state.order);
    const [currentPage, setCurrentPage] = useState(1)
    const productsParPage = 8;
    //console.log("otd",orders);
     
    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch(clearError())
        }
        dispatch(getOrdersByAdmin())
    }, [dispatch, error,toast])

    const totalPages = Math.ceil(orders?.orders?.length / productsParPage)

    const indexOfLastProduct = currentPage * productsParPage;
    const indexOfFirstProduct = indexOfLastProduct - productsParPage;
    const currentOrders = orders?.orders?.slice(indexOfFirstProduct, indexOfLastProduct);

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

    const handleDelet = (id) =>{
        if(window.confirm("Are you sure you want to delete this order ?")){
            dispatch(deleteOrder(id))
        }
    }

    const orderStatusPOS = (status) => {
        switch (status) {
          case 'processing':
            return <span className='text-blue-500'>Processing</span>
        case 'Shipped':
             return <span className='text-yellow-500'>Shipped</span>  
          case 'Delivered':
            return <span className='text-green-500'>Delivered</span>
          case 'cancelled':
            return <span className='text-red-500'>Cancelled</span>
          default:
            return <span>{status}</span>
        }
      };


    return (
        <div className='w-full bg-white shadow-md rounded-md min-h-[calc(100vh-70px)]'>
            <h2 className='text-center font-bold p-4 text-xl border-b '>Orders List</h2>
            <div className='grid grid-cols-5 place-items-center border-b p-2  shadow-md  '>

                <div className=''>
                    <p>Order_Id</p>
                </div>

                <div>
                    <p>Status</p>
                </div>

                <div>
                    <p>Items Quentity</p>
                </div>

                <div>
                    <p>Amount</p>
                </div>

                <div>
                    <p>Action</p>
                </div>
            </div>
            {
                !loading && currentOrders?.map((order) => (
                    <div className='grid grid-cols-5 place-items-center  p-2 space-y-2 bg-slate-50 hover:bg-lime-100 '
                        key={order._id}
                    >

                        <div className='text-sm'>
                            <p>{order._id}</p>
                        </div>

                        <div className='text-sm'>
                            <p>{orderStatusPOS(order.orderStatus)}</p>
                        </div>

                        <div className='text-sm'>
                            <p>{order?.orderItems?.length}</p>
                        </div>

                        <div className='text-sm'>
                            <p>₹{order.totalPrice}</p>
                        </div>

                        <div className='flex gap-8 text-xl'>
                            <Link to={`/admin/order/${order?._id}`} ><MdModeEdit className='text-green-500 hover:scale-125 transition-all' /></Link>
                           <button onClick={() =>handleDelet(order?._id)} disabled={loading}> <MdDeleteForever  className='text-red-500 hover:scale-125 transition-all' /> </button>
                        </div>
                    </div>
                ))
            }
            <div className={`flex justify-end gap-20 items-center mt-10 mr-20 ${orders?.orders?.length > productsParPage ? "block" : "hidden" } `}>
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
        </div>
    )
}

export default OrdersList
