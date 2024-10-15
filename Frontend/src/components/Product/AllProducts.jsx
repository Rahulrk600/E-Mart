import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchProductCard } from '../index'
import { getProducts } from '../../Store/Reducer/productSlice'
import { GoSortDesc } from 'react-icons/go'
import { CiFilter } from 'react-icons/ci'
import SortPopupForMobile from './SortPopupForMobile'
import SortByCategoryForMobile from './SortByCategoryForMobile'


const categorys = [
    "airpodes",
    "camera",
    "earphones",
    "mobile",
    "mouse",
    "printer",
    "processor",
    "refrigerator",
    "speakers",
    "trimmers",
    "televisition",
    "watches"
]


function AllProducts() {

    const dispatch = useDispatch()
    const { theme } = useSelector((state) => state.theme)
    const { products, loading, filterProductCount } = useSelector((state) => state.products)
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState([0, 25000]);
    const [ratings, setRatings] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [product, setProduct] = useState(products);
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)


    const priceHandler = (e) => {
        const { name, value } = e.target;
        setPrice((prev) => (name === 'min' ? [value, prev[1]] : [prev[0], value]));
    }
    const ratingsHandler = (e) => {
        setRatings(Number(e.target.value))
    }
    const openPopup = () => {
        setIsOpen(true)
    }

    const closePopup = () => {
        setIsOpen(false)
    }

    const openPopupCategory = () => {
        setIsOpenFilter(true)
    }

    const closePopupCategory = () => {
        setIsOpenFilter(false)
    }

    const campare = (a, b, type) => {
        switch (type) {
            case 'low-to-high':
                return a.price - b.price;
            case 'high-to-low':
                return b.price - a.price;
            case 'by-rating':
                return b.ratings - a.ratings;
            default:
                return 0;
        }
    }

    const handleSort = (type) => {
        const sorted = [...products].sort((a, b) => campare(a, b, type));
        setProduct(sorted)
    }

    const handleSortCategory =(category)=>{
        const filterProducts = products.filter(
            (product)=> product.category === category
        );
        setCategoryProduct(filterProducts)
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
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : ''} p-2 sm:p-4`}>
            <div className=' container mx-auto px-4 flex flex-col sm:flex-row sm:gap-3'>
                {/** Filter */}
                <div className='flex justify-between items-center p-3 text-black bg-gray-100 rounded-lg shadow-md sm:hidden'>
                    <div className=' relative ml-3  cursor-pointer' onClick={openPopup}>
                        <GoSortDesc className=' absolute top-2 right-8' />
                        <p className='ml-2 font-medium'>sort</p>
                    </div>
                    <p className='font-light'>|</p>
                    <div className=' relative cursor-pointer' onClick={openPopupCategory}>
                        <CiFilter className=' absolute top-2 right-10' />
                        <p className='ml-2 font-medium'>Filter</p>
                    </div>
                </div>
                <div className={`sm:hidden mt-2 ${theme === 'dark' ? 'bg-black text-white' : ''} rounded-r-lg shadow-md`}>
                    <div className='grid grid-cols-2 grid-rows-2 gap-2 max-h-[calc(100vh-120px)]'>

                        {
                            product?.map((product) => (
                                <SearchProductCard key={product._id} product={product} />
                            ))
                        }
                    </div>
                </div>
                <div className={`sm:hidden mt-2 ${theme === 'dark' ? 'bg-black text-white' : ''} rounded-r-lg shadow-md`}>
                    <div className='grid grid-cols-2 grid-rows-2 gap-2 max-h-[calc(100vh-120px)]'>

                        {
                            categoryProduct?.map((product) => (
                                <SearchProductCard key={product._id} product={product} />
                            ))
                        }
                    </div>
                </div>
                <aside className={` hidden sm:block w-1/4 p-4 ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-slate-100'}  rounded-lg shadow-md overflow-y-scroll`}>
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
                                    <div key={categoris} className=' hover:text-red-400 ml-2 capitalize'>
                                        <input
                                            type='checkbox'
                                            value={categoris}
                                            checked={category.includes(categoris)}
                                            onChange={categoryHandal}
                                            className='mr-2'

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


                <div className={`sm:w-3/4 mt-2 sm:mt-0 ${theme === 'dark' ? 'bg-black text-white' : ''} rounded-r-lg shadow-md`}>
                    <h2 className='text-xl font-medium mb-4 my-3 p-2 ml-6 border-b '>Products</h2>
                    <div className='grid grid-cols-2 grid-rows-2 sm:grid-cols-4 gap-2 sm:mx-6 max-h-[calc(100vh-120px)]'>

                        {
                            !loading && products?.map((product) => (
                                <SearchProductCard key={product._id} product={product} />
                            ))
                        }
                    </div>
                </div>

            </div>
            <SortPopupForMobile
                isOpen={isOpen}
                onClose={closePopup}
                onSort={handleSort}
            />
            <SortByCategoryForMobile
            isOpen={isOpenFilter}
            onClose={closePopupCategory}
            onSort={handleSortCategory}
            categorys={categorys}
            />

        </div>
    )
}

export default AllProducts
