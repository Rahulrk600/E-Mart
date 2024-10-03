
import React, { useEffect, useState } from 'react'
import { CategoryList, SlidingImage, Horizontal_card, Verticaly_card } from '../components/index.js'
import axios from 'axios'

function Home() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get("http://localhost:8000/api/v1/products/all/products")
        setData(data.data)
      } catch (error) {
        setError(error)
      }
    }
    setLoading(false)
    fetchData()
  }, []);

  return (
    <>
      <div>
        <CategoryList />
        <SlidingImage />
        <Horizontal_card category={"mobile"} heading={"Best SmartPhone"} />

        <div className=' container mx-auto py-1'>
          <h2 className='text-2xl font-semibold mb-4'>Featured Products</h2>
          <div className='grid grid-cols-2 grid-rows-2 sm:grid-cols-5 gap-6'>
            {
              data?.products?.map(product => (
                <Verticaly_card key={product._id} product={product} />
              ))
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default Home
