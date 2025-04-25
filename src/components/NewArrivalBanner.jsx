import React from 'react'
import { Link } from 'react-router-dom'

const NewArrivalBanner = () => {
  return (
    <div className='w-full mt-5 flex justify-center bg-white mb-5'>
      <div className="banner w-full bg-gradient-to-t from-black via-stone-900 to-black flex flex-col lg:flex-row rounded-lg overflow-hidden shadow-lg">
        
        {/* Left Banner Content */}
        <div className="banner-lft w-full lg:w-[50%] px-6 py-8 flex flex-col justify-center items-center text-center lg:text-left space-y-4">
          <Link 
            to={{ pathname: "/product/categories" }} 
            className="text-amber-400 text-lg lg:text-2xl font-medium hover:underline"
          >
            Categories
          </Link>
          
          
         
        </div>

        {/* Right Banner Image */}
        <div className="banner-rgt w-full lg:w-[50%] flex items-center justify-center bg-transparent p-4 lg:p-8">
          
        </div>
        
      </div>
    </div>
  )
}

export default NewArrivalBanner;
