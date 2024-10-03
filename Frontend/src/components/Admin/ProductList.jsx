import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProductsByAdmin,clearError } from '../../Store/Reducer/productSlice'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'
import { toast } from 'react-toastify'


function ProductList() {

    const dispatch = useDispatch();
    const { products, loading,error } = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1)
    const productsParPage = 10;

   
    useEffect(() => {
        if(error){
         toast.error(error)
         dispatch(clearError())
        }
        dispatch(getProductsByAdmin())
    }, [dispatch,error])

    const totalPages = Math.ceil(products.length / productsParPage)

    const indexOfLastProduct = currentPage * productsParPage;
    const indexOfFirstProduct = indexOfLastProduct - productsParPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

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

    const handleDelet =(id)=>{
        if(window.confirm('are you sure you want to delete this product?')){
            dispatch(deleteProduct({id}))
        }
    };

    return (
        <div className='w-full bg-white shadow-md rounded-md min-h-[calc(100vh-70px)]'>
            <h2 className='text-center font-bold p-4 text-xl border-b '>Products List</h2>
            <div className='grid grid-cols-5 place-items-center border-b p-2  shadow-md  '>

                <div className=''>
                    <p>Product_Id</p>
                </div>

                <div>
                    <p>Name</p>
                </div>

                <div>
                    <p>Stocks</p>
                </div>

                <div>
                    <p>Price</p>
                </div>

                <div>
                    <p>Action</p>
                </div>
            </div>
            {
                !loading && currentProducts?.map((product) => (
                    <div className='grid grid-cols-5 place-items-center  p-2 space-y-2 bg-slate-50 hover:bg-lime-100 '
                        key={product._id}
                    >

                        <div className='text-sm'>
                            <p>{product._id}</p>
                        </div>

                        <div className='text-sm'>
                            <p>{product.name}</p>
                        </div>

                        <div className='text-sm'>
                            <p>{product.stock}</p>
                        </div>

                        <div className='text-sm'>
                            <p>{product.price}</p>
                        </div>

                        <div className='flex gap-8 text-xl'>
                           <Link to={`/admin/product/${product._id}`}><MdModeEdit className='text-green-500 hover:scale-125 transition-all' /></Link>
                            <MdDeleteForever onClick={()=>handleDelet(product._id)} className='text-red-500 hover:scale-125 transition-all' />
                        </div>
                    </div>
                ))
            }
            <div className={`flex justify-end gap-20 items-center mt-10 mr-20 ${products.length > productsParPage ? "block" : "hidden" } `}>
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

export default ProductList
