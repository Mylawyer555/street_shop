import React from 'react'
import { Link } from 'react-router-dom'

const NewArrivalBanner = () => {
  return (
    <div className='w-full mt-5 flex justify-center bg-white mb-5'>
        <div className="banner w-full bg-gradient-to-t from-black via-stone-900 to-black flex flex-col lg:flex-row">
            {/* Left Banner Content */}
            <div className="banner-lft w-full lg:w-[50%] px-5 flex flex-col justify-center items-center text-center lg:text-left">
                <Link to={{pathname:"/product/categories"}} className='text-amber-400 text-2xl font-medium'>
                    Categories
                </Link>
                <h1 className='text-white leading-tight text-[40px] lg:text-[60px] font-bold my-2'>
                    Enhance Your Music Experience
                </h1>
                <p className='text-[#505050] text-[18px] lg:text-[20px] my-2.5'>
                    Discover our latest and exclusive items
                </p>
                <Link className='bg-amber-400 flex w-[150px] h-[50px] lg:w-[180px]  lg:h-[60px]   items-center justify-center rounded-lg text-white font-bold text-xl' to="/products">
                    Shop Now
                </Link>
            </div>
            {/* Right Banner Image */}
            <div className="banner-rgt w-full lg:w-[50%] flex items-center justify-center bg-transparent">
                <img src="/jbl_speaker1-removebg-preview.png" alt="JBL Speaker" className="w-[250px] lg:w-[350px] h-auto" />
            </div>
        </div>
    </div>
  )
}

export default NewArrivalBanner
