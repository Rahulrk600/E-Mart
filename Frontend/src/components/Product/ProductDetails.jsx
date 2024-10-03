import React, { useCallback, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductDetails } from '../../Store/Reducer/productSlice';
import { addToCart } from '../../Store/Reducer/cartSlice.js';
import Review from '../Product/Review.jsx'
import ReviewCard from './ReviewCard.jsx';
import { toast } from 'react-toastify';

function ProductDetails() {
    const { product, loading } = useSelector((state) => state.products)
    
    const options = {
        edit: false,
        color: "rgba(20,20,20.0.1)",
        activeColor: "yellow",
        size: window.innerWidth < 650 ? 16 : 21,
        isHalf: true,
        value: product?.ratings
        
    };
    
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const imageIsLoading = new Array(4).fill(null)
    const [isActiveImage, setIsActiveImage] = useState("");
    const [isOpenReview, setIsOpenReview] = useState(false)
    const [zoomImage, setZoomImage] = useState(false)
    const [zoomImagePoint, setZoomImagePoint] = useState({
        x: 0,
        y: 0
    })

    const openReview = () => {
        setIsOpenReview(true)
    }

    const closeReview = () => {
        setIsOpenReview(false)
    }


    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id))
        }

        setIsActiveImage(product?.images[0])
    }, [dispatch, id, setIsActiveImage,])

    const handalMouseEnterEvent = (image) => {
        setIsActiveImage(image)
    }

    const hendalZoomImage = useCallback((e) => {
        setZoomImage(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()

        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height

        setZoomImagePoint({
            x,
            y
        })

    }, [zoomImagePoint])

    const handleLeaveImageZoom = () => {
        setZoomImage(false)
    }

    const item = {
        product: product?._id,
        image: product?.images[0],
        name: product?.name,
        price: product?.price,
        ratings: product?.ratings,
        stock: product?.stock,
        quantity: 1
    }

    const handalAddToCart = () => {

        dispatch(addToCart(item));
        if (item.stock > 0) {
            toast.success("Item Add in Cart successfully")
        } else {
            toast.error("out of stock")
        }
    }

    const handalBayNow = () => {
        if (item.stock > 0) {
            dispatch(addToCart(item))
            navigate('/shippingDetails')
        } else {
            toast.error("out of stock")
        }
    }

    return (
        <div className=' container mx-auto p-4'>

            <div className='min-h-[200px] flex flex-col sm:flex-row  gap-4 '>
                {/* product image*/}
                <div className='h-96 flex flex-col sm:flex-row-reverse gap-4'>
                    {
                        loading ? (
                            <div className='h-[300px] w-[300] sm:h-96 sm:w-96 bg-white animate-pulse'>
                                <img src="" className='w-full h-full object-scale-down mix-blend-multiply ' />
                            </div>
                        ) : (
                            <div className='h-[300px] w-[300] sm:h-96 sm:w-96 bg-white relative'>
                                <img onMouseMove={hendalZoomImage} onMouseLeave={handleLeaveImageZoom} src={isActiveImage} className='w-full h-full object-scale-down mix-blend-multiply' />
                                {/** Product Zoom */}
                                {
                                    zoomImage && (
                                        <div className=' hidden sm:block absolute min-w-[500px] min-h-[400px] bg-white p-1 -right-[510px] top-0'>
                                            <div className='w-full h-full min-h-[400px] min-w-[400px] scale-100'
                                                style={{
                                                    backgroundImage: `url(${isActiveImage})`,
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: `${zoomImagePoint.x * 100}% ${zoomImagePoint.y * 100}%`
                                                }}
                                            >

                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <div className='h-full'>
                        {
                            loading ? (
                                <div className='flex gap-2 sm:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        imageIsLoading.map((el, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-white robgunded  animate-pulse' key={"image" + index}>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) :
                                (
                                    <div className='flex gap-2 sm:flex-col overflow-scroll scrollbar-none h-full'>
                                        {
                                            product?.images.map((imageurl) => {
                                                return (
                                                    <div className='h-20 w-20 bg-white rounded p-1' key={imageurl}>
                                                        <img src={imageurl} className='w-full h-full object-scale-down mix-blend-multiply' onMouseEnter={() => handalMouseEnterEvent(imageurl)} onClick={() => handalMouseEnterEvent(imageurl)} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                        }
                    </div>
                </div>
                {/** product details */}
                {
                    loading ? (
                        <div className=' grid gap-1 w-1/2'>
                            <h2 className='-xl sm:-2xl font-medium bg-white animate-pulse h-6 w-full '></h2>
                            <p className=' capitalize bg-white animate-pulse h-6 w-full  '></p>
                            <div className='flex gap-1 bg-white animate-pulse h-6 w-full '>

                            </div>
                            <p className='bg-white animate-pulse h-6 w-full '></p>
                            <p className='bg-white animate-pulse h-6 w-full '></p>
                            <div className='flex items-center gap-20 my-2'>
                                <button className=' border-2 bg-white animate-pulse h-6 w-full  rounded px-3 py-1 min-w-[120px] font-medium  hover:-white'></button>
                                <button className=' border-2  rounded px-3 py-1 min-w-[120px] font-medium bg-white animate-pulse h-6 w-full  hover:-white'></button>
                            </div>
                            <div>
                                <p className='bg-white animate-pulse h-6 w-full  font-medium my-1'> </p>
                                <p className='bg-white animate-pulse h-6 w-full '></p>
                            </div>
                            <button className=' mt-4 border-2  rounded px-3 py-1 min-w-[100px] font-medium bg-white animate-pulse h-6 w-full '></button>
                        </div>

                    ) : (
                        <div className=' flex flex-col gap-2'>
                            <h2 className='text-xl sm:text-2xl font-medium '>{product?.name}</h2>
                            <p className=' capitalize text-slate-600 '>{product?.category}</p>
                            <div className='flex gap-1 text-red-500'>
                                <ReactStars {...options} /> <span> ({product?.numOfReviews} Reviews)</span>
                            </div>
                            <p className='text-slate-600'>₹{product?.price}</p>
                            <p className='text-green-500'>Stock - {product?.stock}</p>
                            <div className='flex items-center gap-3 my-2'>
                                <button onClick={handalBayNow} className=' border-2 border-red-500 rounded px-3 py-1 min-w-[120px] font-medium -red-500 hover:bg-red-500 hover:text-white'>Buy</button>
                                <button onClick={handalAddToCart} className=' border-2 border-red-500 rounded px-3 py-1 min-w-[120px] font-medium -red-500 hover:bg-red-500 hover:text-white'>Add to Cart</button>
                            </div>
                            <div>
                                <p className='-slate-600 font-medium my-1'>Description : </p>
                                <p className=''>{product?.description}</p>
                            </div>
                            <button onClick={openReview} className=' mt-4 border-2 border-red-500 rounded px-3 py-1 min-w-[100px] font-medium -red-500 hover:bg-green-500 hover:-white'>Submit Review</button>
                        </div>

                    )
                }
            </div>
            <div className="mt-8 flex flex-col sm:flex-row overflow-auto">
                {
                    product?.reviews?.map((review) => (
                        <ReviewCard key={review._id} reveiw={review} />
                    ))
                }
            </div>
            <Review
                isOpen={isOpenReview}
                onClose={closeReview}
                productId={id}

            />
        </div>
    )
}

export default ProductDetails
