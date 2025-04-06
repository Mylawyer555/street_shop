import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import {motion} from "framer-motion"



const HeroSection = () => {

    

const slides = [
    {
        id: 1,
        title: "New Arrivals",
        image: "/closeup.jpg",
        description: "Check out our new arrivals"
    },
    {
        id: 2,
        title: "Summer Collection",
        image: "/black friday1.jpg",
        description: "Discover our latest summer collections"
    },
    {
        id: 3,
        title: "Exclusive Offers",
        image: "young woman.jpg",
        description: "Experience our exclusive offers"
    }
]

// banner slider
const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
    const interval = setInterval(() => {
        nextSlide();
    }, 10000) // changes every 5 seconds
},[])

const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
}

// manually go to slide
const goToSlide = (index) =>{
    setCurrentIndex(index)
}


  return (
    <div className="mx-auto w-full h-[400px] flex ">
        {/* catergories */}
        {/* <div className="w-[25%] h-[100%] border-r border-r-neutral-300 flex justify-end">
            <div className="w-[60%] h-[100%] ">
                <ul className="list-none">
                    <li className="p-[8px] bg-white hover:bg-[whitesmoke]  hover:text-amber-500 transition"><a href="">Womens fashion</a></li>
                    <li className="p-[8px]  bg-white hover:bg-[whitesmoke]  hover:text-amber-500 transition"><a href="">Mens Fashion</a></li>
                    <li className="p-[8px]  bg-white hover:bg-[whitesmoke] hover:text-amber-500 transition "><a href="">Electronics</a></li>
                    <li className="p-[8px]  bg-white hover:bg-[whitesmoke] hover:text-amber-500 transition-all"><a href="">Home & Lifestyle</a></li>
                    <li className="p-[8px]  bg-white hover:bg-[whitesmoke] hover:text-amber-500 transition-all"><a href="">Medicine</a></li>
                    <li className="p-[8px]  bg-white hover:bg-[whitesmoke] hover:text-amber-500 transition-all"><a href="">Sports and Outdoor</a></li>
                    <li className="p-[8px]  bg-white hover:bg-[whitesmoke] hover:text-amber-500 transition-all"><a href="">Baby & toys</a></li>
                    <li className="p-[8px]  bg-white hover:bg-[whitesmoke] hover:text-amber-500 transition-all"><a href="">Groceries & pets</a></li>
                    <li className="p-[8px]  bg-white hover:bg-[whitesmoke] hover:text-amber-500 transition-all"><a href="">Health and beauty</a></li>
                </ul>
            </div>
        </div> */}
        <div className="w-[100%] h-[100%] flex items-center justify-center ">
            {/* slide shows */}
            <div className="w-[100%] h-[100%] min-w-[200px] ">
                <div className="w-[100%] h-[100%] flex flex-col items-center justify-center  relative " style={{backgroundColor:"whitesmoke"}}>
                    <div className=" absolute top-32 left-auto flex flex-col items-center justify-center ">
                        <h2 className="text-2xl  text-white font-extrabold md:text-5xl lg:text-6xl ">{slides[currentIndex].title}</h2>
                        <p className="text-xl  text-white mb-9 text-center md:text-2xl ">{slides[currentIndex].description}</p>
                        <Link className="  md:mx-auto px-3 py-2 shadow-md border-2 border-white text-white rounded-[8px] hover:bg-white hover:text-black">Shop Now</Link>
                    </div>
                    <img 
                    src={slides[currentIndex].image} alt="slides" className="w-full h-[100%] object-cover  "/>
                   
                    {/* dot navigation */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`bg-white w-3 h-3 rounded-full cursor-pointer transition-all ${
                                currentIndex === index ? "border-2 border-amber-500 scale-125" : "bg-transparent"
                                }`}
                            ></div>
                        ))}
                    </div>
                </div>

               
            </div>

            
        </div>

    </div>
  )
}

export default HeroSection