import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchProductCard } from '../index'
import { getProducts } from '../../Store/Reducer/productSlice'
import { GoSortDesc } from 'react-icons/go'


const categorys = [
    "Airpodes",
    "camera",
    "Earphones",
    "mobile",
    "Mouse",
    "Printer",
    "processor",
    "Refrigerator",
    "Speakers",
    "Trimmers",
    "Televisition",
    "Watches"
]


function AllProducts() {

    const dispatch = useDispatch()
    const { products, loading,filterProductCount } = useSelector((state) => state.products)
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState([0, 25000]);
    const [ratings, setRatings] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)


    const priceHandler = (e) => {
        const { name, value } = e.target;
        setPrice((prev) => (name === 'min' ? [value, prev[1]] : [prev[0], value]));
    }
    const ratingsHandler = (e) => {
        setRatings(Number(e.target.value))
    }

    const categoryHandal = (e) => {
        setCategory(e.target.value)
        //     setCategory((prev)=>
        //     prev.includes(category)
        //     ? prev.filter((c)=>  c !== category)
        //     : [...prev , category]
        // )
    }

    useEffect(() => {
        dispatch(getProducts({ price: [price[0], price[1]], ratings, category }))
    }, [dispatch, price, ratings, category])

    return (
        <div className='min-h-screen bg-slate-200 p-2 sm:p-4'>
            <div className=' container mx-auto px-4 flex flex-col sm:flex-row sm:gap-3'>
                {/** Filter */}
                <div className='flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-md sm:hidden'>
                    <div className=' relative ml-3'>
                        <GoSortDesc className=' absolute top-4' />
                        <p className='ml-2 font-medium'>sort</p>
                    </div>
                    <p className='font-light'>|</p>
                    <div className=' relative'>
                        <p className='mr-2 font-medium'>Filter</p>
                    </div>
                </div>
                <aside className=' hidden sm:block w-1/4 p-4 bg-gray-100 rounded-lg shadow-md overflow-y-scroll '>
                    <h2 className=' text-sm  font-medium mb-2 border-b border-gray-500 py-2'>Filters({filterProductCount})</h2>

                    <div className='mb-2 border-b border-gray-400'>
                        <h3 className=' font-medium text-sm mb-1'>Price Range</h3>
                        <div className=' relative'>
                            <div className=''>
                                <input
                                    type='range'
                                    value={price[0]}
                                    name='min'
                                    aria-label='range-slider'
                                    min='0'
                                    max='25000'
                                    className='w-full'
                                    onChange={priceHandler}

                                />
                                <span className='text-sm font-medium'>max(₹{price[0]})</span>
                            </div>
                            <div className=' absolute top-0 ml-3'>
                                <input
                                    type='range'
                                    value={price[1]}
                                    name='max'
                                    aria-label='range-slider'
                                    min='0'
                                    max='25000'
                                    className='w-full'
                                    onChange={priceHandler}
                                />
                                <span className='text-sm font-medium ml-40'>max(₹{price[1]})</span>
                            </div>
                        </div>

                    </div>
                    <div className='mb-2 border-b border-gray-400'>
                        <h3 className=' font-medium text-sm mb-1'>Category</h3>
                        <div className='text-sm flex flex-col gap-2 py-2'>
                            {
                                categorys.map((categoris) => (
                                    <div key={categoris} className=' hover:text-red-400 ml-2'>
                                        <input
                                            type='checkbox'
                                            value={categoris}
                                            checked={category.includes(categoris)}
                                            onChange={categoryHandal}
                                            className=''

                                        />
                                        {categoris}
                                    </div>

                                ))
                            }
                        </div>
                    </div>

                    <div className='mb-2 border-b border-gray-400'>
                        <h3 className=' font-medium text-sm mb-1'>Ratings</h3>
                        <input
                            type='range'
                            value={ratings}
                            aria-label='range-slider'
                            min='0'
                            max='5'
                            step={0.1}
                            className='w-2/3'
                            onChange={ratingsHandler}
                        />
                        <span className='text-sm font-medium ml-16'>star({ratings})</span>
                    </div>
                </aside>


                <div className='sm:w-3/4 mt-2 sm:mt-0 bg-gray-100 rounded-r-lg shadow-md'>
                    <h2 className='text-xl font-medium mb-4 my-3 p-2 ml-6 border-b '>Products</h2>
                    <div className='grid grid-cols-2 grid-rows-2 sm:grid-cols-4 gap-3 sm:mx-6 max-h-[calc(100vh-120px)]'>

                        {
                            !loading && products?.map((product) => (
                                <SearchProductCard key={product._id} product={product} />
                            ))
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AllProducts
