import React, { useState,useEffect } from 'react'
import {FaAngleRight,FaAngleLeft} from 'react-icons/fa6'
import image1m from '../../assets/banner/img1_mobile.jpg'
import image2m from '../../assets/banner/img2_mobile.webp'
import image3m from '../../assets/banner/img3_mobile.jpg'
import image4m from '../../assets/banner/img4_mobile.jpg'
import image5m from '../../assets/banner/img5_mobile.png'

import image1 from '../../assets/banner/img1.webp'
import image2 from '../../assets/banner/img2.webp'
import image3 from '../../assets/banner/img3.jpg'
import image4 from '../../assets/banner/img4.jpg'
import image5 from '../../assets/banner/img5.webp'

function SlidingImage() {
    
    const [currentImage, setCurrentImage] = useState(0)
    const forDesktopImage = [
        image1,
        image2,
        image3,
        image4,
        image5,
    ]

    const forMobileImage = [
        image1m,
        image2m,
        image3m,
        image4m,
        image5m,
    ]
    
    const nextImage = () =>{
       if(forDesktopImage.length-1 > currentImage)
        setCurrentImage((preve )=> preve + 1)
    }
    
    const prevImage = ()=>{
        if(currentImage != 0)
            setCurrentImage(preve => preve - 1)
       
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
          if(forDesktopImage.length-1 > currentImage){
            nextImage()
          }else{
            setCurrentImage(0)
          }
        },3000)
        return () => clearInterval(interval)
    },[currentImage])

    return (
        <div className='container mx-auto px-4 rounded  '>
            <div className='bg-white h-48 sm:h-64 w-full relative'>
                <div className=' absolute z-10 w-full h-full sm:flex items-center hidden'>
                   <div className=' flex justify-between w-full text-2xl'>
                   <button onClick={prevImage} className='bg-white shadow-md rounded-full'><FaAngleLeft/></button>
                   <button onClick={nextImage} className='bg-white shadow-md rounded-full'><FaAngleRight/></button>
                   </div>
                </div>
                {/* for desktop*/
 }               <div className=' hidden sm:flex w-full h-full overflow-hidden'>
                    {
                        forDesktopImage.map((imageUrl, index) => {
                            return (
                                <div className='w-full h-full  min-w-full min-h-full transition-all' key={imageUrl} style={{transform: `translatex(-${currentImage * 100}%)`}}>
                                    <img
                                        src={imageUrl}
                                        className='w-full h-full'
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                {  /* for moblile */}
                <div className='flex w-full h-full overflow-hidden sm:hidden'>
                    {
                        forMobileImage.map((imageUrl, index) => {
                            return (
                                <div className='w-full h-full  min-w-full min-h-full transition-all' key={imageUrl} style={{transform: `translatex(-${currentImage * 100}%)`}}>
                                    <img
                                        src={imageUrl}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SlidingImage
